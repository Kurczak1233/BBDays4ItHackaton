from urllib.request import urlopen

from PIL import Image


class ImageDownloader:
    def __init__(self):
        pass

    def download_image(self, img_url):
        return Image.open(urlopen(img_url))

