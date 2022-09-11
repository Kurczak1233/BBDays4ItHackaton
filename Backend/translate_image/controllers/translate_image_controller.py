import base64
import io
import json

from translate_image.aws.rekognition_provider import RekognitionProvider
from translate_image.services.image_downloader_service import ImageDownloaderService
from translate_image.services.image_text_processor_service import ImageTextProcessorService
from translate_image.services.translate_text_service import TranslateTextService


class TranslateImageController:
    def __init__(self):
        self.image_downloader_service = ImageDownloaderService()
        self.recognition_provider = RekognitionProvider()
        self.translate_service = TranslateTextService()
        self.image_text_processor_service = ImageTextProcessorService()

    def execute(self, url):
        image = self.image_downloader_service.download_image(url)

        bytes_image = self._get_bytes_from_image(image)

        response = self.recognition_provider.detect_text(bytes_image)
        text_detections = response["TextDetections"]

        text_processor_data = []
        merged_text = ""

        for text_detection in text_detections:
            text = text_detection["DetectedText"]

            if not any(c.isalpha() for c in text):
                continue

            type = text_detection["Type"]
            bounding_box = text_detection["Geometry"]["BoundingBox"]

            if type == "LINE":
                merged_text += text
                merged_text += "\n"
                text_processor_data.append({'text': text, 'bounding_box': bounding_box})

        translate_response = self.translate_service.translate(merged_text, 'pl')
        translated_text_array = translate_response.text.splitlines()

        new_image = self.image_text_processor_service.change_text_on_image(image, text_processor_data, translated_text_array)

        string_image = "data:image/png;base64, " + base64.b64encode(self._get_bytes_from_image(new_image)).decode('ascii')

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            "body": json.dumps({'image': string_image})
        }

    def _get_bytes_from_image(self, image):
        img = image.crop()
        img_byte_arr = io.BytesIO()

        img.save(img_byte_arr, format='PNG')

        return img_byte_arr.getvalue()
