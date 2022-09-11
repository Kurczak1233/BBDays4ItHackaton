from PIL import Image, ImageDraw, ImageFont, ImageFilter


class ImageTextProcessor:

    def change_text_on_image(self, image: Image, text_lines_to_translate, translated_text_array):
        translated_image = image

        for index, text_line in enumerate(text_lines_to_translate):
            translated_image = self._change_text_line_on_image(translated_image, text_line,
                                                               translated_text_array[index])

        return translated_image

    def _change_text_line_on_image(self, image, text_line, translated_text):
        left = text_line["bounding_box"]["Left"]
        top = text_line["bounding_box"]["Top"]
        max_width = text_line["bounding_box"]["Width"]

        img = self._draw_text_on_image(image, translated_text, left, top, max_width)

        return img

    def _draw_text_on_image(
            self, img: Image, text: str, left_corner_x_percent, left_corner_y_percent, max_width_percent):
        img = img.convert('RGB')
        draw = ImageDraw.Draw(img)

        text_color = "black"

        width, height = img.size
        max_width = (width * max_width_percent)

        left_corner_x = (left_corner_x_percent * width)
        left_corner_y = (left_corner_y_percent * height) - 5
        text_coords = (left_corner_x, left_corner_y)

        font = self._get_font(text, max_width)

        left, top, right, bottom = draw.textbbox(text_coords, text, font=font)
        padding = 5
        blurred, mask = self._get_blurred_background(
            img, (left - padding, top - padding, right + padding, bottom + padding))

        img.paste(blurred, mask=mask)

        draw.text(text_coords, text, font=font, fill=text_color)

        return img

    def _get_blurred_background(self, img, coords):
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.rectangle(coords, fill=255)
        blurred = img.filter(ImageFilter.GaussianBlur(4))

        return blurred, mask

    def _get_font(self, txt: str, max_width: int):
        font_size = 1
        font_name = "./arial.ttf"
        font = ImageFont.truetype(font_name, font_size)

        while font.getsize(txt)[0] < max_width:
            font_size += 1
            font = ImageFont.truetype(font_name, font_size)

        return font
