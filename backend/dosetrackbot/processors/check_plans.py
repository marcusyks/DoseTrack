from django_tgbot.decorators import processor
from django_tgbot.state_manager import message_types, update_types, state_types
from django_tgbot.types.update import Update
from django_tgbot.exceptions import ProcessFailure
from ..bot import state_manager, TelegramBot
from ..models import TelegramState
from django_tgbot.types.inlinekeyboardbutton import InlineKeyboardButton
from django_tgbot.types.inlinekeyboardmarkup import InlineKeyboardMarkup
from ..api.fetch import fetch_data_from_plans, plansFormatter, update_plans


@processor(state_manager, from_states='check_plans',update_types=update_types.CallbackQuery)
def check_plans(bot: TelegramBot, update: Update, state: TelegramState):
    chat_id = update.get_chat().get_id()
    data = update.get_callback_query().get_data()

    if data == "Correct":
        bot.sendMessage(chat_id, "Reminders set!\n\n You can check your activated plans using /plans.")
        #Activate unactivated plans
        update_plans(fetch_data_from_plans(update.get_user().username,False),True)
        state.set_name('activate_celery')

    elif data == "Wrong":
        bot.sendMessage(chat_id, "Edit your plans and try again!", reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
                [InlineKeyboardButton.a(text='Check Again',callback_data='Check Again')]
        ]))
        state.set_name('fetch_plans')
    else:
        pass