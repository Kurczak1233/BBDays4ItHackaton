from PIL import Image
from PIL import ImageDraw

filename = "test"

# open image
img = Image.open('img/test.jpg')

# draw image object
img_with_text = ImageDraw.Draw(img)

# add text to image
img_with_text.text((28, 36), "hello world", fill=(255, 0, 0))

# save image
img.save('output/test.jpg')
