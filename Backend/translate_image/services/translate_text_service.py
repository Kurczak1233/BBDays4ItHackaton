from googletrans import Translator

class TranslateTextService:
    def __init__(self):
        self.translator = Translator()

    def translate(self, text, target_language):
        return self.translator.translate(text, target_language, 'auto')
