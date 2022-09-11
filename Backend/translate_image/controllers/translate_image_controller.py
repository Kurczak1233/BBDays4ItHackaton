import io
import json
import re

from translate_image.aws.rekognition_provider import RekognitionProvider
from translate_image.aws.s3_provider import S3Provider
from translate_image.services.image_downloader_service import ImageDownloaderService
from translate_image.services.image_text_processor_service import ImageTextProcessorService
from translate_image.services.translate_text_service import TranslateTextService


class TranslateImageController:
    def __init__(self):
        self.image_downloader_service = ImageDownloaderService()
        self.recognition_provider = RekognitionProvider()
        self.translate_service = TranslateTextService()
        self.image_text_processor_service = ImageTextProcessorService()
        self.s3_provider = S3Provider()

        self.languages_list = ['fr', 'es', 'nl', 'de', 'it']

    def execute(self, url):
        folder_name = re.sub('[^a-zA-Z0-9 ]', '', url)
        if self.s3_provider.check_if_image_exist(folder_name):
            return self._return_ok_status()

        image = self.image_downloader_service.download_image(url)

        bytes_image = self._get_bytes_from_image(image)
        response = self.recognition_provider.detect_text(bytes_image)
        text_detections = response["TextDetections"]

        text_processor_data = []
        merged_text = ""

        for text_detection in text_detections:
            text = text_detection["DetectedText"]
            type = text_detection["Type"]
            bounding_box = text_detection["Geometry"]["BoundingBox"]

            if type == "LINE":
                merged_text += text
                merged_text += "\n"
                text_processor_data.append({'text': text, 'bounding_box': bounding_box})

        for language in self.languages_list:
            translate_response = self.translate_service.translate(merged_text, language)
            translated_text_array = translate_response.text.splitlines()

            new_image = self.image_text_processor_service.change_text_on_image(image, text_processor_data, translated_text_array)

            self.s3_provider.save_image(io.BytesIO(self._get_bytes_from_image(new_image)), folder_name, language)

        return self._return_ok_status()

    def _get_bytes_from_image(self, image):
        img = image.crop()
        img_byte_arr = io.BytesIO()

        img.save(img_byte_arr, format='PNG')

        return img_byte_arr.getvalue()

    def _return_ok_status(self):
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            "body": json.dumps({'message': 'ok'})
        }