from PIL import Image, ImageFont
from PIL import ImageDraw


def get_font(txt: str, max_width: int):
    font_size = 1

    font_name = "segoeui.ttf"

    font = ImageFont.truetype(font_name, font_size)

    while font.getsize(txt)[0] < max_width:
        font_size += 1
        font = ImageFont.truetype(font_name, font_size)

    return font


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
    max_height = height * max_height_percent

    left_corner_x = left_corner_x_percent * width
    left_corner_y = left_corner_y_percent * height
    coords = (left_corner_x, left_corner_y)

    font = get_font(text, max_width)

    left, top, right, bottom = draw.textbbox(coords, text, font=font)
    draw.rectangle((left - 5, top - 5, right + 5, bottom + 5), fill="white")
    draw.text(coords, text, font=font, fill=text_color)

    # draw.line(
    #     [
    #         (left_corner_x, left_corner_y),
    #         (left_corner_x_percent + max_width, left_corner_y)
    #     ],
    #     fill="black",
    #     width=3)

    return img
