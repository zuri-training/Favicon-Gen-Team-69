def generate_fav(image, size):
	if size == "favicon":
		resized_img = image.resize((64,64))
		resized_img.save('favicon.ico')	#convert to blob for saving to database
	else:
		resized_img = image.resize(size)
		img_name = f"{size[0]}x{size[0]}"
		resized_img.save(f"icon{img_name}.png")	#convert to blob for saving to database

def generate_all_fav(image, sizes):
	for size in ico_sizes:
		generate_fav(image, size)