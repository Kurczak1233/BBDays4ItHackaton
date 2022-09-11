from translate_image.translate_image import translate

response = translate({'queryStringParameters': {'url': 'https://doc.infogixsaas.com/govern/Content/Resources/Images/user-guide/govern-navigation-5_800x401.png'}}, {})

print(response)
