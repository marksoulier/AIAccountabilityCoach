import boto3
from keys import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, ClientError


def send_sms(phone_number, message):
    try:
        client = boto3.client(
            "sns",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_REGION,
        )

        response = client.publish(PhoneNumber=phone_number, Message=message)
        return response
    except NoCredentialsError:
        print(
            "Error: Missing AWS credentials. Please provide your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY."
        )
    except PartialCredentialsError:
        print(
            "Error: Incomplete AWS credentials. Please check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY."
        )
    except ClientError as e:
        print(f"An error occurred: {e.response['Error']['Message']}")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")


# phone_number = "+19704306152"
# message = "This is a test from Django!"

# response = send_sms(phone_number, message)
# if response:
#     print("Message sent successfully. Response:")
#     print(response)
