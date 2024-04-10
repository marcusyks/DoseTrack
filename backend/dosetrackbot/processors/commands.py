<<<<<<< HEAD
from django_tgbot.decorators import processor
from django_tgbot.state_manager import message_types, update_types, state_types
from django_tgbot.types.update import Update
from ..bot import state_manager
from ..models import TelegramState
from ..bot import TelegramBot
from django_tgbot.types.inlinekeyboardbutton import InlineKeyboardButton
from django_tgbot.types.inlinekeyboardmarkup import InlineKeyboardMarkup
from ..api.fetch import fetch_data_from_plans, update_plans, plansFormatter

# Commands
@processor(state_manager, from_states=state_types.All, message_types=message_types.Text, update_types=update_types.Message)
def command(bot: TelegramBot, update: Update, state: TelegramState):
    chat_id = update.get_chat().get_id()
    text = update.get_message().get_text()
    current_state = state.name
    command = list(text)[0]


    if command == "/":
        # Help text
        if text == '/help':
            bot.sendMessage(chat_id, '''💊DoseTrack Helpline💊
                            \n\t1) Press /start to start the onboarding process
                            \n\t2) If you have an account already, press "Yes!" and skip to step 4
                            \n\t3) Press "No...", create an account and make plans with your Telegram username on the website provided
                            \n\t4) Wait while we load your plans and verify them
                            \n\t5) Press 'Correct' if they are correct, skip to step 8.
                            \n\t6) If your details are wrong, press 'No' and make changes on the website.
                            \n\t7) Press 'Check Again' to verify again. Move to step 5.
                            \n\t8) You are done!
                            \n\t/plans to check your plans
                            \n\t/stop to stop the reminders/bot''')

        # Starts signing up
        elif text == '/start':
            if current_state == "":
                bot.sendMessage(chat_id, 'Hello! and welcome to DoseTrack!')
                bot.sendMessage(chat_id, 'Have you signed up yet?', reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
                    [InlineKeyboardButton.a(text='No...', callback_data='No...'), InlineKeyboardButton.a(text='Yes!',callback_data='Yes!')]
                ]))
                state.set_name('signup')
            else:
                bot.sendMessage(chat_id, 'You are already signing up! Use /stop to stop and start again')

        # Stops the state
        elif text == '/stop':
            bot.sendMessage(chat_id, 'Stopping the bot now...')
            state.clean()
            state.set_name('')
            #Update activated plans to be not activated
            update_plans(fetch_data_from_plans(update.get_user().username,True),False)

        #Check plans
        elif text == '/plans':
            # Fetch all activated plans
            activatedPlans = fetch_data_from_plans(update.get_user().username, True)
            if activatedPlans: #If exists
                bot.sendMessage(chat_id,plansFormatter(activatedPlans,"activated"))
            else:
                bot.sendMessage(chat_id,'You have no plans activated')

        # Not a command
        else:
            bot.sendMessage(chat_id, 'Unknown command.')

    # Normal text is allowed to pass
    else:
        pass

=======
from django_tgbot.decorators import processor
from django_tgbot.state_manager import message_types, update_types, state_types
from django_tgbot.types.update import Update
from ..bot import state_manager
from ..models import TelegramState
from ..bot import TelegramBot
from django_tgbot.types.inlinekeyboardbutton import InlineKeyboardButton
from django_tgbot.types.inlinekeyboardmarkup import InlineKeyboardMarkup
from ..api.fetch import fetch_data_from_plans, update_plans, plansFormatter

# Commands
@processor(state_manager, from_states=state_types.All, message_types=message_types.Text, update_types=update_types.Message)
def command(bot: TelegramBot, update: Update, state: TelegramState):
    chat_id = update.get_chat().get_id()
    text = update.get_message().get_text()
    current_state = state.name
    command = list(text)[0]


    if command == "/":
        # Help text
        if text == '/help':
            bot.sendMessage(chat_id, '''💊DoseTrack Helpline💊
                            \n\t1) Press /start to start the onboarding process
                            \n\t2) If you have an account already, press "Yes!" and skip to step 4
                            \n\t3) Press "No...", create an account and make plans with your Telegram username on the website provided
                            \n\t4) Wait while we load your plans and verify them
                            \n\t5) Press 'Correct' if they are correct, skip to step 8.
                            \n\t6) If your details are wrong, press 'No' and make changes on the website.
                            \n\t7) Press 'Check Again' to verify again. Move to step 5.
                            \n\t8) You are done!
                            \n\t/plans to check your plans
                            \n\t/stop to stop the reminders/bot''')

        # Starts signing up
        elif text == '/start':
            if current_state == "":
                bot.sendMessage(chat_id, 'Hello! and welcome to DoseTrack!')
                bot.sendMessage(chat_id, 'Have you signed up yet?', reply_markup=InlineKeyboardMarkup.a(inline_keyboard=[
                    [InlineKeyboardButton.a(text='No...', callback_data='No...'), InlineKeyboardButton.a(text='Yes!',callback_data='Yes!')]
                ]))
                state.set_name('signup')
            else:
                bot.sendMessage(chat_id, 'You are already signing up! Use /stop to stop and start again')

        # Stops the state
        elif text == '/stop':
            bot.sendMessage(chat_id, 'Stopping the bot now...')
            state.set_name('')
            #Update activated plans to be not activated
            update_plans(fetch_data_from_plans(update.get_user().username,True),False)

        #Check plans
        elif text == '/plans':
            # Fetch all activated plans
            activatedPlans = fetch_data_from_plans(update.get_user().username, True)
            if activatedPlans: #If exists
                bot.sendMessage(chat_id,plansFormatter(activatedPlans,"activated"))
            else:
                bot.sendMessage(chat_id,'You have no plans activated')

        # Not a command
        else:
            bot.sendMessage(chat_id, 'Unknown command.')

    # Normal text is allowed to pass
    else:
        pass

>>>>>>> d6d8060 (MVP)
