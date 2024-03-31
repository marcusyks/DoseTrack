from django_tgbot.decorators import processor
from django_tgbot.state_manager import message_types, update_types, state_types
from django_tgbot.types.update import Update
from django_tgbot.exceptions import ProcessFailure
from ..bot import state_manager, TelegramBot
from ..models import TelegramState
from django_tgbot.types.inlinekeyboardbutton import InlineKeyboardButton
from django_tgbot.types.inlinekeyboardmarkup import InlineKeyboardMarkup
from ..api.fetch import fetch_data_from_plans, plansFormatter


@processor(state_manager, from_states='fetch_plans', fail=state_types.Keep, update_types=update_types.CallbackQuery)
def fetch_plans(bot: TelegramBot, update: Update, state: TelegramState):
    chat_id = update.get_chat().get_id()
    data = update.get_callback_query().get_data()

    if data == "Done" or data == "Alright!":
        plans = fetch_data_from_plans(update.get_callback_query().get_user().username, False)
        if plans: #If successful
            # Allow verification of unactivated plans
            bot.sendMessage(chat_id,plansFormatter(plans,"unactivated"), reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
                [InlineKeyboardButton.a(text='Correct',callback_data='Correct'), InlineKeyboardButton.a(text='Wrong',callback_data='Wrong')]
            ]))
            state.set_name('check_plans')
        else:
            bot.sendMessage(chat_id,"Have you created an account / created plans? Please try again!")
            state.set_name('wait_for_follow_up')

    # Subsequent Checks
    elif data == "Check Again":
        bot.sendMessage(chat_id,"Checking again...")
        plans = fetch_data_from_plans(update.get_callback_query().get_user().username,False)
        if plans: #If successful
            # Allow verification of unactivated plans
            bot.sendMessage(chat_id,plansFormatter(plans,"unactivated"), reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
                [InlineKeyboardButton.a(text='Correct',callback_data='Correct'), InlineKeyboardButton.a(text='Wrong',callback_data='Wrong')]
            ]))
            state.set_name('check_plans')
        else:
            bot.sendMessage(chat_id,"Have you created an account / created plans? Please try again!")
            state.set_name('wait_for_follow_up')
    else:
        pass
