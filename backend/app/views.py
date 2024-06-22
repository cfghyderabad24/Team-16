from django.shortcuts import render
from django.conf import settings 
from django.core.mail import EmailMessage, send_mail 
from django.shortcuts import render 
from django.http import HttpResponse 
    
var = {"email": "2100030086cseh@gmail.com", "typeOfAllert": "upload", "name": "nelima"} 

visit_string = f"Please note that a visit to the project {var['name']} is scheduled for [date] at [location]. It is important that you make it to the visit to ensure that all necessary information is gathered and any necessary actions are taken. If you have any questions or concerns about the visit, please reach out to [your_name] at [your_email]."
upload_string = f"Please note that an update to the project {var['name']} has been made. Please check your email for more information."
approval_string = f"Please note that an update to the project {var['name']} has been made. Please check your email for more information."


def index(request):
    if var["typeOfAllert"] == "visit":
        message = visit_string
    if var["typeOfAllert"] == "upload":
        message = upload_string
    if var["typeOfAllert"] == "approval":
        message = approval_string
        
    subject = var["typeOfAllert"]
    email_from = settings.EMAIL_HOST_USER 
    recipient_list = [var["email"]]   
    
    print(f"Subject: {subject}") 
    print(f"From: {email_from}") 
    print(f"To: {recipient_list}") 
    print(f"Message: {message}") 

    try: 
        email = EmailMessage( 
            subject, 
            message, 
            email_from, 
            recipient_list 
        ) 
        email.send() 
        print("Email sent successfully.") 
        return HttpResponse('Email sent successfully.') 
    except Exception as e: 
        print(f"Failed to send email. Error: {str(e)}") 
        return HttpResponse(f'Failed to send email. Error: {str(e)}') 
    return render(request, 'index.html')
        