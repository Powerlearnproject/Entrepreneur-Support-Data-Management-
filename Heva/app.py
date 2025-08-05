from flask import Flask, request, jsonify
import pandas as pd
import joblib
import pickle

app = Flask(__name__)

# Load model and encoders
model = joblib.load("loan_model.pkl")
with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])  # Convert input JSON to DataFrame

    # Apply label encoders
    for col in label_encoders:
        if col in df.columns:
            df[col] = label_encoders[col].transform(df[col])

    prediction = model.predict(df)[0]
    result = "Y" if prediction == 1 else "N"
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
