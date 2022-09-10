import boto3
from botocore.exceptions import ClientError


class RekognitionProvider:
    def __init__(self):
        self.provider = boto3.client('rekognition')

    def detect_text(self, bytes_image):
        try:
            response = self.provider.detect_text(Image={'Bytes': bytes_image})
        except ClientError as error:
            print(error)
            return
        return response
