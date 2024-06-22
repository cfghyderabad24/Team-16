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
        "subject": "Upcoming Visit Reminder",
        "message": "Dear {name}, this is a reminder for your upcoming visit. Please check your dashboard for more details. The deadline is in 60 days."
    },
    "visit": {
        "subject": "Scheduled Visit Notification",
        "message": "Dear {name}, you have a scheduled visit coming up. Please review the details in your dashboard. The deadline is in 30 days."
    },
    "uploadremainder": {
        "subject": "Document Upload Reminder",
        "message": "Dear {name}, this is a reminder to upload the necessary documents. Immediate action is required to avoid any delays."
    },
    "upload": {
        "subject": "Important Document Upload",
        "message": "Dear {name}, please upload the necessary documents. Check your dashboard for more information and ensure timely submission."
    },
    "approve": {
        "subject": "Approval Notification",
        "message": "Dear {name}, you have a new approval notification. Please review and take the necessary action as soon as possible."
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
        name = var.get("name", "name")
        subject = alert.get("subject", "Default Subject").format(name=name)
        message = alert.get("message", "Default Message").format(name=name)
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
