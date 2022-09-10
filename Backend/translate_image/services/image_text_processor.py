from PIL import Image, ImageDraw, ImageFont


class ImageTextProcessor:
    def __init__(self):
        pass

    def change_text_on_image(self, image: Image, text_lines_to_translate):
        translated_image = image

        for text_line in text_lines_to_translate:
            translated_image = self.change_text_line_on_image(translated_image, text_line)

    def change_text_line_on_image(self, image, text_line):
        left = text_line["Geometry"]["BoundingBox"]["Left"]
        top = text_line["Geometry"]["BoundingBox"]["Top"]
        max_width = text_line["Geometry"]["BoundingBox"]["Width"]

        text = text_line["DetectedText"]
        text_color = "blue"

        img = self.draw_text_on_image(image, text, left, top, text_color, max_width)

        return img

    def draw_text_on_image(self,
                           img: Image,
                           text: str,
                           left_corner_x_percent,
                           left_corner_y_percent,
                           text_color,
                           max_width_percent):
        img = img.convert('RGB')
        draw = ImageDraw.Draw(img)

        width, height = img.size
        max_width = width * max_width_percent

        left_corner_x = left_corner_x_percent * width
        left_corner_y = left_corner_y_percent * height
        text_coords = (left_corner_x, left_corner_y)

        font = self.get_font(text, max_width)

        left, top, right, bottom = draw.textbbox(text_coords, text, font=font)
        draw.rectangle((left - 5, top - 5, right + 5, bottom + 5), fill="white")
        draw.text(text_coords, text, font=font, fill=text_color)

        return img

    def get_font(self, txt: str, max_width: int):
        font_size = 1
        font_name = "segoeui.ttf"
        font = ImageFont.truetype(font_name, font_size)

        while font.getsize(txt)[0] < max_width:
            font_size += 1
            font = ImageFont.truetype(font_name, font_size)

        return font
