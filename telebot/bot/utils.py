from .api import fetch_data_from_plans,update_plans, plansFormatter
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

def switch(state, option, bot, query, api_address):
    username = query.from_user.username

    if state == "start": # START state

        if option == 'yes':
            unactivated_plans = fetch_data_from_plans(username,False,api_address)

            plans_text = plansFormatter(unactivated_plans,'unactivated')
            if len(unactivated_plans) == 0: #No unactivated plans
                query.edit_message_text(text=f'You do not have any unactivated plans. Check your activated plans with /plans')
                return

            keyboard = [
                    [
                        InlineKeyboardButton("Correct", callback_data="activate_correct"),
                        InlineKeyboardButton("No", callback_data="activate_no"),
                    ]
                ]

            reply_markup = InlineKeyboardMarkup(keyboard)

            query.edit_message_text(plans_text, reply_markup=reply_markup)

        elif option == 'no':
            message = f'Proceed to https://dose-track-nu.vercel.app/, sign up and create your plans'

            keyboard = [
                    [
                        InlineKeyboardButton("Im done!", callback_data="start_yes"),
                    ]
                ]

            reply_markup = InlineKeyboardMarkup(keyboard)

            query.edit_message_text(message, reply_markup=reply_markup)

    elif state == "activate":
        # Update plans to activated
        if option == 'correct':
            unactivated_plans = fetch_data_from_plans(username,False,api_address)
            update_plans(unactivated_plans,True,api_address)
        else:
            message = f'Update your plans online and press "Im done!" to check again'
            keyboard = [
                        [
                            InlineKeyboardButton("Im done!", callback_data="start_yes"),
                        ]
            ]

            reply_markup = InlineKeyboardMarkup(keyboard)
            query.edit_message_text(message, reply_markup=reply_markup)
