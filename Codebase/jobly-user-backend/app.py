from flask import Flask, request, jsonify
import boto3
import os

app = Flask(__name__)

# Retrieve AWS credentials and S3 bucket name from environment variables
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
S3_BUCKET = os.environ.get('S3_BUCKET_NAME')

if not all([AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET]):
    raise ValueError("Please set the AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and S3_BUCKET_NAME environment variables.")

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

def create_s3_folder_if_not_exists(bucket_name, folder_name):
    # Create an empty file with a folder-like key to simulate creating a folder in S3
    folder_key = f'{folder_name}/'
    s3.put_object(Bucket=bucket_name, Key=folder_key)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    user_id = request.form['user_id']

    # Create the S3 folder 'resumes' within the 'jobly' bucket if it doesn't exist
    folder_name = 'resumes'
    create_s3_folder_if_not_exists(S3_BUCKET, folder_name)

    # Upload the file to the 'resumes' folder within the 'jobly' bucket
    file_key = f'{folder_name}/{user_id}/{file.filename}'
    s3.upload_fileobj(file, S3_BUCKET, file_key)

    return jsonify({'message': 'File uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)
