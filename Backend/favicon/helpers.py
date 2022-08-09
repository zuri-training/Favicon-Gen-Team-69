from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from zipfile import ZipFile
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import Icon

import requests


def generate_icon(image, size, favicon):
    if size == "favicon":
        resized_img = image.resize((64, 64))
        img_name = "favicon"
        img_ext = 'ICO'
    else:
        resized_img = image.resize(size)
        img_name = f"{size[0]}x{size[0]}"
        img_ext = 'PNG'
    blob = BytesIO()
    resized_img.save(fp=blob, format=img_ext)
    blob_val = blob.getvalue()
    file_image = ContentFile(blob_val)
    icon_file = InMemoryUploadedFile(
        file_image, None, 'foo.png', 'image/png', file_image.tell, None)

    my_icon = Icon(favicon=favicon)
    upload_icon = my_icon.icon
    upload_icon.save(img_name, icon_file)

    my_icon.save()


def generate_favicon(image, sizes, favicon):
    pillow_image = Image.open(image)
    for size in sizes:
        generate_icon(pillow_image, size, favicon)


def text_to_image(text_data):

    img_width = len(text_data["text"]) * int(text_data["font_size"] / 2)
    img_height = text_data["font_size"] + 10

    new_img = Image.new("RGB", (img_width, img_height),
                        text_data["background_color"],)

    drawable_img = ImageDraw.Draw(new_img)

    font_file = requests.get(text_data["url"])

    file_image = ContentFile(font_file.content)

    font_ttf = ImageFont.truetype(file_image, size=text_data["font_size"])

    drawable_img.text((img_width / len(text_data["text"]), img_height / text_data["font_size"]),
                      text_data["text"], font=font_ttf, fill=text_data["text_color"])

    blob = BytesIO()

    new_img.save(fp=blob, format="PNG")

    text_image = ContentFile(blob.getvalue())

    image_file = InMemoryUploadedFile(
        text_image, None, 'text_image.png', 'image/png', text_image.tell, None)

    return image_file


def favicons_to_zip(favicon):
    zip_blob = BytesIO()
    with ZipFile(zip_blob, "w") as my_zip:
        for icon in favicon.icons.all():
            fav_icon = Image.open(icon.icon)
            image_format = fav_icon.format
            blob = BytesIO()
            fav_icon.save(blob, image_format)
            my_zip.writestr(
                f"{icon.icon.name}.{image_format}", blob.getvalue())
            
    content = ContentFile(zip_blob.getvalue())
    uploadable_zip = InMemoryUploadedFile(
        content, None, 'favion.zip', 'application/zip', content.tell, None)
    
    zip = favicon.zip_file
    zip.save("favicon.zip", uploadable_zip)
    favicon.save()
    
    return favicon
    
