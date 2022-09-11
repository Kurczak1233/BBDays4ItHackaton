import io
from urllib.request import urlopen

from PIL import Image

img = Image.open(urlopen('https://doc.infogixsaas.com/govern/Content/Resources/Images/user-guide/govern-navigation-5_800x401.png'))
roi_img = img.crop()
img_byte_arr = io.BytesIO()
roi_img.save(img_byte_arr, format='PNG')
img_byte_arr = img_byte_arr.getvalue()

print(img_byte_arr)
