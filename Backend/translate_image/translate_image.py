from translate_image.controllers.translate_image_controller import TranslateImageController


def translate(event, _):
    url = event['queryStringParameters']['url']

    return TranslateImageController().execute(url)
