import json
from .models import Plan, User
from celery import shared_task
from django.utils import timezone
from datetime import datetime, timedelta
import logging
import requests

import environ
env = environ.Env()
environ.Env.read_env()

def send_scheduled_reminder(reminder, chatID):

    # Set up the parameters for the sendMessage method
    telegram_api_url = f"https://api.telegram.org/bot{env('BOT_TOKEN')}/sendMessage"  # Replace <your_bot_token> with your actual bot token

    # Send the reminder message using the Telegram bot API
    response = requests.post(telegram_api_url, json={"chat_id": chatID, "text": reminder})

    # Check if the message was sent successfully
    if response.status_code == 200:
        print("Reminder message sent successfully!")
    else:
        print("Failed to send reminder message.")

# Celery
def resultFormatter(medicine, time, day):
    week = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    return f"\n💊 Medicine name: {medicine}\n\t⌚ Time: {time}\n\t📅 Day: {week[int(day)]}\n"

def check_medicine_time(medicineNames, current_time, day):
    result = ""

    for medicine in medicineNames:
        time = medicine.time
        if str(time) == current_time:
            result += resultFormatter(medicine, time, day)

    return result

def should_send_reminder(frequency, current_time, plan):
    current_date = datetime.now()
    daysOfWeek = current_date.weekday() # Monday is 0
    medicineNames = plan.medicineNames.all()
    send_reminder = ""

    frequency = list(str(frequency))
    for day in frequency:
        if day == str(daysOfWeek): # Plan schedule falls on the date
            send_reminder = check_medicine_time(medicineNames, current_time, day) # Check individual medicine to be sent
    return send_reminder

def find_user_id(telegramHandle):
    user = User.objects.filter(telegramHandle=telegramHandle).first()
    if user:
        chatID = user.chatID
        return chatID
    else:
        print("User cannot be found!")
        return None

def checkTime(time):
    current_time = time + timedelta(hours=8)
    hour = f"{current_time.hour:02d}"
    minute = f"{current_time.minute:02d}"
    return f'{hour}:{minute}:00'

@shared_task
def check_reminders(): # A repeating loop to check each plan and send if they meet requirements (plan frequency && medicine time)
    # Debugging
    logger = logging.getLogger(__name__)
    logger.info("Checking reminders...")
    current_time = checkTime(timezone.now())
    logger.info(f'Current Time: {current_time}')
    active_plans = Plan.objects.filter(activated=True)
    medicine_information = ""

    if not active_plans.exists():
        return  # No active plans

    for plan in active_plans:
        # Determine if the reminder should be sent at the current time
        frequency = plan.frequency
        medicine_information = should_send_reminder(frequency, current_time, plan)
        if medicine_information != "":
            logger.info("Sending message")
            # Get id of user
            telegramHandle = plan.telegramHandle
            chatID = find_user_id(telegramHandle)

            if chatID:
                reminder = f"\t⭐ Reminder:\n\n\t🎯 Plan name: {plan.planName}\n\t{medicine_information}"
                send_scheduled_reminder(reminder, chatID)




