from PIL import Image
from types import SimpleNamespace

from image_drawer import draw_text_on_image
from ocr_response_handler import get_ocr_response, filter_only_lines_in_response

response = get_ocr_response()
filtered_response = filter_only_lines_in_response(response)


def draw_on_img(image, text_line):
    left = text_line["Geometry"]["BoundingBox"]["Left"]
    top = text_line["Geometry"]["BoundingBox"]["Top"]
    max_width = text_line["Geometry"]["BoundingBox"]["Width"]
    max_height = text_line["Geometry"]["BoundingBox"]["Height"]

    text = text_line["DetectedText"]
    text_color = "blue"

    img = draw_text_on_image(image, text, left, top, text_color, max_width, max_height)

    return img


file_test_name = "test.jpg"
image = Image.open(f'img/{file_test_name}')

img1 = image

for x in filtered_response:
    img1 = draw_on_img(img1, x)

img1.save(f'output/{file_test_name}')

# file_test2_name = "test2.png"
# image2 = Image.open(f'img/{file_test2_name}')
# text_coordinates2 = (50, 60)
# text2 = "hejka2"
# text_color2 = (255, 0, 255)
# img2 = draw_text_on_image(image2, text2, text_coordinates2, text_color2)
# img2.save(f'output/{file_test2_name}')
#
