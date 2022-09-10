import json


def translate(event, context):
    print(event)
    print(context)
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "Region ": 'Goodbye World!'
        })
    }