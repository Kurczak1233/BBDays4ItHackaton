from PIL import Image, ImageFont
from PIL import ImageDraw


def translate_text_on_image(image, text_line):
    left = text_line["Geometry"]["BoundingBox"]["Left"]
    top = text_line["Geometry"]["BoundingBox"]["Top"]
    max_width = text_line["Geometry"]["BoundingBox"]["Width"]
    max_height = text_line["Geometry"]["BoundingBox"]["Height"]

    text = text_line["DetectedText"]
    text_color = "blue"

    img = draw_text_on_image(image, text, left, top, text_color, max_width, max_height)

    return img


def draw_text_on_image(img: Image,
                       text: str,
                       left_corner_x_percent,
                       left_corner_y_percent,
                       text_color,
                       max_width_percent,
                       max_height_percent):
    img = img.convert('RGB')
    draw = ImageDraw.Draw(img)

    width, height = img.size
    max_width = width * max_width_percent

    left_corner_x = left_corner_x_percent * width
    left_corner_y = left_corner_y_percent * height
    coords = (left_corner_x, left_corner_y)

    font = get_font(text, max_width)

    left, top, right, bottom = draw.textbbox(coords, text, font=font)
    draw.rectangle((left - 5, top - 5, right + 5, bottom + 5), fill="white")
    draw.text(coords, text, font=font, fill=text_color)

    return img


def get_font(txt: str, max_width: int):
    font_size = 1

    font_name = "segoeui.ttf"

    font = ImageFont.truetype(font_name, font_size)

    while font.getsize(txt)[0] < max_width:
        font_size += 1
        font = ImageFont.truetype(font_name, font_size)

    return font
