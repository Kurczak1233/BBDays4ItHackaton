from PIL import Image

from image_translator import translate_text_on_image
from ocr_response_handler import get_ocr_response, filter_only_lines_in_response

response = get_ocr_response()
filtered_response = filter_only_lines_in_response(response)

file_test_name = "test.jpg"
image = Image.open(f'img/{file_test_name}')

translated_image = image

for x in filtered_response:
    translated_image = translate_text_on_image(translated_image, x)

translated_image.save(f'output/{file_test_name}')
