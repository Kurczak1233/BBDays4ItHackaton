import boto3
from botocore.exceptions import ClientError


class S3Provider:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.bucket_name = 'translated-images'

    def save_image(self, bytes_image, folder_name, language):
        print(folder_name)
        file_path = f'{folder_name}/{folder_name}_{language}.png'
        try:
            self.s3.upload_fileobj(bytes_image, self.bucket_name, file_path)

            self.s3.put_object_acl(Bucket=self.bucket_name, Key=file_path, ACL='public-read')
        except ClientError as error:
            print(error)
            return False
        return True

    def check_if_image_exist(self, folder_name):
        print(folder_name)
        file_path = f'{folder_name}/{folder_name}_nl.png'
        try:
            image = self.s3.get_object(Bucket=self.bucket_name, Key=file_path)

            return image is not None
        except ClientError as error:
            print(error)
            print('no obj in s3')
        return False
