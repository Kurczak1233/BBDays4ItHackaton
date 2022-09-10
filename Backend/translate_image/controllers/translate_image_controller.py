import io

from translate_image.aws.rekognition_provider import RekognitionProvider
from translate_image.services.image_downloader_service import ImageDownloaderService
from translate_image.services.image_text_processor import ImageTextProcessor
from translate_image.services.translate_text_service import TranslateTextService


class TranslateImageController:
    def __init__(self):
        self.image_downloader_service = ImageDownloaderService()
        self.recognition_provider = RekognitionProvider()
        self.translate_service = TranslateTextService()
        self.image_text_processor = ImageTextProcessor()

    def execute(self, url):
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

        translate_response = self.translate_service.translate(merged_text, 'pl')
        translated_text_array = translate_response.text.splitlines()

        new_image = self.image_text_processor.change_text_on_image(image, text_processor_data, translated_text_array)
        new_image.save('test.png')

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": 'json.dumps(result)'
        }

    def _get_bytes_from_image(self, image):
        img = image.crop()
        img_byte_arr = io.BytesIO()

        img.save(img_byte_arr, format='PNG')

        return img_byte_arr.getvalue()
