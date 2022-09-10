from typing import Tuple

from PIL import Image, ImageFont
from PIL import ImageDraw


def draw_text_on_image(img: Image, text: str, text_coordinates: Tuple[int, int], text_color):
    img = img.convert('RGB')
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype("segoeui.ttf", 40)

    # draw.text(text_coordinates, text, fill=text_color)

    left, top, right, bottom = draw.textbbox(text_coordinates, text, font=font)
    draw.rectangle((left - 5, top - 5, right + 5, bottom + 5), fill="white")
    draw.text(text_coordinates, text, font=font, fill="black")

    return img
