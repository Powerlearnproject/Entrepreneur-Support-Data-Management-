
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib
import pickle

# Step 1: Load dataset
df = pd.read_csv("DatasetForLoanAndGrantApplications.csv")

# Step 2: Drop LoanID column
df_model = df.drop(columns=["LoanID"])

# Step 3: Encode categorical columns
label_encoders = {}
for column in df_model.select_dtypes(include='object').columns:
    le = LabelEncoder()
    df_model[column] = le.fit_transform(df_model[column])
    label_encoders[column] = le  # Store encoders if needed later

# Step 4: Define features and target
X = df_model.drop(columns=["LoanStatus"])
y = df_model["LoanStatus"]

# Step 5: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Step 7: Evaluate
y_pred = model.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))

# Step 8: Save the trained model
joblib.dump(model, "loan_model.pkl")

# Step 9: Save the label encoders
with open("label_encoders.pkl", "wb") as f:
    pickle.dump(label_encoders, f)

print("✅ Model saved as loan_model.pkl and label_encoders.pkl (no plots shown)")
