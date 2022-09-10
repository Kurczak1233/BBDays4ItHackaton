import io
import json

from translate_image.aws.rekognition_provider import RekognitionProvider
from translate_image.services.image_downloader_service import ImageDownloaderService


class TranslateImageController:
    def __init__(self):
        self.image_downloader = ImageDownloaderService()
        self.recognition_provider = RekognitionProvider()

    def execute(self, url):
        image = self.image_downloader.download_image(url)

        bytes_image = self._get_bytes_from_image(image)

        result = self.recognition_provider.detect_text(bytes_image)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps(result)
        }

    def _get_bytes_from_image(self, image):
        img = image.crop()
        img_byte_arr = io.BytesIO()

        img.save(img_byte_arr, format='PNG')

        return img_byte_arr.getvalue()
