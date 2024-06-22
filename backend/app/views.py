# views.py

from django.conf import settings
from django.core.mail import EmailMessage
from django.shortcuts import render
from django.http import HttpResponse

# Sample data for demonstration
var = {
    "name": "Navya",
    "email": "2100031266cseh@gmail.com",
    "type_of_alert": "visitremainder"    
}

# Dictionary mapping alert types to their respective subjects and messages
ALERTS = {
    "visitremainder": {
        "subject": "New Visit Alert",
        "message": "You have a new visit alert. Please check your dashboard for more details. Deadline is in 60 days."
    },
    "visit": {
        "subject": "Reminder Alert",
        "message": "This is a reminder alert for visit. Deadline is in 30 days."
    },
    "uploadremainder": {
        "subject": "Warning Alert",
        "message": "You have received a warning alert. Immediate attention is required."
    },
    "upload": {
        "subject": "Information Alert",
        "message": "Here is some important information for you."
    },
    "approve": {
        "subject": "Notification Alert",
        "message": "You have a new notification. Please review it."
    }
}

def send_email(request):
    if request.method == "POST":
        # Get the selected alert type from the form
        alert_type = var.get("type_of_alert")

        # Retrieve the alert details from ALERTS dictionary based on the alert_type
        alert = ALERTS.get(alert_type)

        if not alert:
            return HttpResponse(f'Invalid alert type: {alert_type}')

        # Construct email parameters
        subject = alert.get("subject", "Default Subject")
        message = alert.get("message", "Default Message")
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [var.get("email")]

        print(f"Subject: {subject}")
        print(f"From: {email_from}")
        print(f"To: {recipient_list}")
        print(f"Message: {message}")

        try:
            # Send email using Django's EmailMessage class
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

    # Handle cases where request method is not POST
    return render(request, "home.html")
