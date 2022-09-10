from translate_image.controllers.translate_image_controller import TranslateImageController


def translate(event, context):
    print(event)
    print(context)

    url = 'https://doc.infogixsaas.com/govern/Content/Resources/Images/user-guide/govern-navigation-5_800x401.png'

    return TranslateImageController().execute(url)
