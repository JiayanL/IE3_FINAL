# import os
# from flask import Flask, render_template, request
# from reverseproxy import proxyRequest
# from main import predictors

# MODE = os.getenv('FLASK_ENV')
# DEV_SERVER_URL = 'http://localhost:5000/'

# app = Flask(__name__)

# if MODE == "development":
#     app = Flask(__name__, static_folder=None)
#     print("mode is in fact development")


# @app.route('/')
# @app.route('/<path:path>')
# def index(path=''):
#     print("index is running")
#     if MODE == 'development':
#         return proxyRequest(DEV_SERVER_URL, path)
#     else:
#         return render_template("index.html")  

# @app.route('/receiver', methods=['POST'])
# def receive():
#     if (request.files['image']): 
#         file = request.files['image']
#         file_json =  open("model.json", "r")
#         print(file_json.read())
#         result = predictors(file, file_json)

#         print("RESULT: "+str(result))
#         return result
#     else:
#         print("REQUEST.FILES DIDN'T WORK")
        
# app.run()

from flask import Flask, request, jsonify
from flask_cors import CORS
from main import predictors
from PIL import Image
import mainPredictorOutput
from tensorflow import keras
import cv2
import numpy as np


app = Flask(__name__)
cors = CORS(app)
@app.route('/receiver', methods=['POST'])
def receive():
    '''
    data = request.get_json()
    data = jsonify(data)
    print(data)
    return data
    
    
    if (request.files['image']): 
        file = request.files['image']
        file_json =  open("model.json", "r")
        print(file_json.read())
        result = predictors(file, file_json)

        print("RESULT: "+str(result))
        return result
    else:
        print("REQUEST.FILES DIDN'T WORK")
    
    '''
    #data = request.get_json()
    img = Image.open("backend\Brain_Tumor.jpg")
    img.show()
    json_file =  open("backend\model.json", "r")
    loaded_model = json_file.read()
    json_file.close()
    loaded_model = keras.models.model_from_json(loaded_model)
    loaded_model.load_weights("backend\model.h5")
    #result = predictors(im, file_json)
    #predOutput = mainPredictorOutput.predictor(im, file_json)
    
    img = cv2.resize(np.array(img) ,(28, 28))
    img = img[np.newaxis, :, :, :]
    data = request.get_json()
    data = jsonify(data)
    print(data)
    
    return data
    #return predOutput

    
if __name__ == '__main__':
    app.run(debug=True)