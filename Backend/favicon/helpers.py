from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import Icon


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

def text_co_favicon(size, text,color,background_color):
    
    img = Image.new("RGBA", (100, 50), background_color,)

    d = ImageDraw.Draw(img)

    fnt = ImageFont.truetype("OpenSans-Bold.ttf", size=size)

    d.text((0, 0), text, font=fnt, fill=color)
    
    img.save("icon.ico")
