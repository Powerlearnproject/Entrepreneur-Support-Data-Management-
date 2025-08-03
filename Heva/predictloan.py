
import pandas as pd
import joblib
import pickle
from sklearn.preprocessing import LabelEncoder

# Step 1: Load new data
df = pd.read_csv("DatasetForLoanAndGrantApplications.csv")
df_original = df.copy()

# Step 2: Drop non-informative column
df = df.drop(columns=["LoanID"])

# Step 3: Load encoders used during training
with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

# Step 4: Apply encoders to categorical columns
for col in label_encoders:
    df[col] = label_encoders[col].transform(df[col])

# Step 5: Load saved model
model = joblib.load("loan_model.pkl")

# Step 6: Make predictions
predictions = model.predict(df.drop(columns=["LoanStatus"]))

# Step 7: Map predictions to labels
df_original["PredictedLoanStatus"] = predictions
df_original["PredictedLoanStatus"] = df_original["PredictedLoanStatus"].replace({1: "Y", 0: "N"})

# Step 8: Save results
df_original.to_csv("PredictedLoanResults.csv", index=False)
print("✅ Predictions saved to PredictedLoanResults.csv")
