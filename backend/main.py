import mainPredictorOutput 

def predictors(imgPath, json):
    
    imgPredOutput = mainPredictorOutput.img_predictor(imgPath, json)
    predOutput = mainPredictorOutput.predictor(imgPath, json)

    if predOutput == [1]:
        if imgPredOutput == [1]:
            return 1 #"Found, has Image Output"
        else:
            return 2 #"Found, no Image Output"
    else:
        if imgPredOutput == [1]:
            return 1 #"Found, has Image Output"
        else:
            return 3 #"Not Found by either predictor"

#print("RESULT: "+str(predictors("brain_2.jpg")))