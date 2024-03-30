from django_tgbot.decorators import processor
from django_tgbot.state_manager import message_types, update_types, state_types
from django_tgbot.types.update import Update
from ..bot import state_manager
from ..models import TelegramState
from ..bot import TelegramBot
from django_tgbot.types.inlinekeyboardbutton import InlineKeyboardButton
from django_tgbot.types.inlinekeyboardmarkup import InlineKeyboardMarkup

# Process inlineCallbackQuery
@processor(state_manager, from_states='signup', update_types=update_types.CallbackQuery)
def signup(bot, update, state):
    chat_id = update.get_chat().get_id()
    callback_data = update.get_callback_query().get_data()

    #follow up state
    if callback_data == 'No...':
        bot.sendMessage(chat_id, 'Proceed to https://dose-track-nu.vercel.app/ and sign up!')
        bot.sendMessage(chat_id,"Once you are done with registering and creating your plans, press 'Done'", reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
            [InlineKeyboardButton.a(text='Done',callback_data='Done')]
        ]))
        state.set_name('fetch_plans')

    #api link to account
    elif callback_data == 'Yes!':
        bot.sendMessage(chat_id, 'Let us find your plans!', reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
            [InlineKeyboardButton.a(text='Alright!',callback_data='Alright!')]
        ]))
        state.set_name('fetch_plans')
    else:
        pass
