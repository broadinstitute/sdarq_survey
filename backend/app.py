import json
from flask import request, make_response
from flask_api import FlaskAPI
from flask_cors import CORS, cross_origin
import defectdojo as wrapper
from slacker import Slacker

# Read config
with open('config.json') as config_file:
    data = json.load(config_file)

host = data['host']
user = data['user']
api_key = data['api_key']
slack_token = data['slack_token']

slack = Slacker(slack_token)

# Instantiate the DefectDojo backend wrapper
dd = wrapper.DefectDojoAPI(host, api_key, user, debug=False)
app = FlaskAPI(__name__)
CORS(app, resources=r'/backend/*')

# Prepare to send to DefectDojo
@app.route('/submit/', methods=['POST', 'GET'])
@cross_origin()
def submit():
    jsonData = request.get_json()
    appName = jsonData['Service']

    # Create a product
    prod_type = 1
    product = dd.create_product(appName, "Created for testing", prod_type)

    if product.success:
        # Get the product id
        product_id = product.id()

    # Set product
    data = json.dumps(jsonData).strip('{}')
    data1 = data.strip(',').replace(',',' \n')
    data2 = data1.strip('[').replace('[',' ')
    data3 = data2.strip(']').replace(']',' ')
    data4 = data3.strip('""').replace('"', ' ')

    productDescription = dd.set_product(product_id, description=data4)

    slack.chat.post_message('#dsp-security',
                            'A new security service requirement is sent to DefectDojo :pikasheep: ! The link is here https://defect-dojo.dsp-techops.broadinstitute.org/product/' +  str(product_id) + ' .')

    response = make_response((json.dumps(data),200,
                       {"X-Frame-Options": "SAMEORIGIN",
                        "X-XSS-Protection":"1; mode=block",
                        "X-Content-type-Options":"nosniff"}))

    # response.headers.set('Content-Security-Policy', "default-src 'self'")

    return response


if __name__== "__main__":
    app.run(host='0.0.0.0', port=5000)

