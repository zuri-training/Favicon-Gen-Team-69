from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import Icon

def generate_icon(image, size, favicon_id):
	if size == "favicon":
		resized_img = image.resize((64,64))
		img_name = "favicon"
	else:
		resized_img = image.resize(size)
		img_name = f"{size[0]}x{size[0]}"
	blob = BytesIO()
	resized_img.save(fp=blob, format="PNG")
	blob_val = blob.getvalue()
	file_image = ContentFile(blob_val)
	icon_file = InMemoryUploadedFile(file_image, None, 'foo.png', 'image/png', file_image.tell, None)
	
	my_icon = Icon(favicon=favicon_id)
	upload_icon = my_icon.icon
	upload_icon.save(img_name, icon_file)

	my_icon.save()

def generate_favicon(image, sizes, favicon_id):
	pillow_image = Image.open(image)
	for size in ico_sizes:
		generate_icon(pillow_image, size, favicon_id)