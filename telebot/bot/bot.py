import telegram
import logging
import environ
from .api import update_plans, fetch_data_from_plans, fetch_all_plans_username, plansFormatter, create_user, get_users
from .utils import switch

from telegram.ext import CommandHandler, Updater, CallbackQueryHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext.dispatcher import run_async

env = environ.Env()
environ.Env.read_env()
API_ADDRESS = env('API_ADDRESS')
API_ADDRESS_USERS = env('API_ADDRESS_USERS')

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)

# 'Logging in' the bot with its token
bot = telegram.Bot(token=env('TOKEN'))


# Function for the /start command
@run_async
def start(bot, update):
    # Create a user in Users if not exist
    username = update.effective_user.username
    print(f'START - Username = {username}')

    users = get_users(API_ADDRESS_USERS)
    create_user(users, username,API_ADDRESS_USERS)

    user_first_name = update.effective_user.first_name

    #Reply with markup
    keyboard = [
        [
            InlineKeyboardButton("Yes!", callback_data="start_yes"),
            InlineKeyboardButton("No...", callback_data="start_no"),
        ]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    update.message.reply_text(f"Hello {user_first_name}, and welcome to DoseTrack! Have you registered online?", reply_markup=reply_markup)

@run_async
def help(bot, update):
    username = update.effective_user.username
    print(f'HELP - Username = {username}')
    text = '''💊DoseTrack Helpline💊
                            \n\t1) Press /start to start the onboarding process
                            \n\t2) If you have an account already, press "Yes!" and skip to step 4
                            \n\t3) Press "No...", create an account and make plans with your Telegram username on the website provided
                            \n\t4) Wait while we load your plans and verify them
                            \n\t5) Press 'Correct' if they are correct, skip to step 8.
                            \n\t6) If your details are wrong, press 'No' and make changes on the website.
                            \n\t7) Press 'Im done!' to verify again. Move to step 5.
                            \n\t8) You are done!
                            \n\t/plans to check all your plans
                            \n\t/stop to stop the reminders'''
    bot.sendMessage(chat_id=update.message.chat_id, text=text)

@run_async
def stop(bot, update):
    username = update.effective_user.username
    activated_plans = fetch_data_from_plans(username,True,API_ADDRESS)
    text = f"You have {len(activated_plans)} activated plans. Please start your plans with /start"
    success_text = "Stopping bot now..."

    if len(activated_plans) == 0:
        bot.sendMessage(chat_id=update.message.chat_id, text=text)
        return

    print(f'STOP - Username = {username}')
    bot.sendMessage(chat_id=update.message.chat_id, text=success_text)
    update_plans(activated_plans,False,API_ADDRESS)


@run_async
def plans(bot, update):
    username = update.effective_user.username
    print(f'PLANS - Username = {username}')
    plans = fetch_all_plans_username(username, API_ADDRESS)
    if len(plans) == 0:
        bot.sendMessage(chat_id=update.message.chat_id, text=f"You have no plans...")
        return
    plans_text = plansFormatter(plans,'created')
    bot.sendMessage(chat_id=update.message.chat_id, text=plans_text)



@run_async
def button(bot,update):
    query = update.callback_query
    query.answer()

    selected_option = query.data
    state, option = selected_option.split('_')
    print(f'Callback Query - STATE: {state}, OPTION: {option}')

    # Deal with data
    switch(state, option, bot, query, API_ADDRESS)



def main():
    updater = Updater(token=env('TOKEN'))
    dispatcher = updater.dispatcher

    # Commands
    dispatcher.add_handler(CommandHandler('start', start))
    dispatcher.add_handler(CommandHandler('help', help))
    dispatcher.add_handler(CommandHandler('stop', stop))
    dispatcher.add_handler(CommandHandler('plans', plans))

    # Callback Query
    dispatcher.add_handler(CallbackQueryHandler(button))


    # Starting the bot
    logging.info(f"Bot running at {env('BOT_NAME')}")
    updater.start_polling()
    updater.idle()