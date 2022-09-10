import json


def get_ocr_response():
    f = open('response_examples/test_reponse.json')
    x = json.load(f)
    return x["TextDetections"]


def filter_only_lines_in_response(response):
    only_lines = []
    for text_detection in response:
        if text_detection["Type"] == "LINE":
            only_lines.append(text_detection)

    return only_lines
