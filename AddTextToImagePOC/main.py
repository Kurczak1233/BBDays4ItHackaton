import json

from PIL import Image
from types import SimpleNamespace

from draw_text_on_image import draw_text_on_image

file_test_name = "test.jpg"
image = Image.open(f'img/{file_test_name}')


def get_ocr_response():
    f = open('response_examples/test_reponse.json')
    x = json.load(f)
    return x["TextDetections"]


def filter_only_lines_in_response(response):
    only_lines = []
    for text_detection in response:
        if text_detection["Type"] == "LINE":
            only_lines.append(text_detection)

    return only_lines


response = get_ocr_response()
filtered_response = filter_only_lines_in_response(response)
print(filtered_response)

# file_test2_name = "test2.png"
#
# image = Image.open(f'img/{file_test_name}')
# text_coordinates = (28, 36)
# text = "hejka"
# text_color = (255, 0, 0)
#
# image2 = Image.open(f'img/{file_test2_name}')
# text_coordinates2 = (50, 60)
# text2 = "hejka2"
# text_color2 = (255, 0, 255)
#
# img1 = draw_text_on_image(image, text, text_coordinates, text_color)
# img1.save(f'output/{file_test_name}')
# img2 = draw_text_on_image(image2, text2, text_coordinates2, text_color2)
# img2.save(f'output/{file_test2_name}')
#
