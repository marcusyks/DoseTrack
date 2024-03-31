from django_tgbot.decorators import processor
from django_tgbot.types.update import Update
from dosetrackbot.bot import state_manager, TelegramBot
from dosetrackbot.models import TelegramState

@processor(state_manager, from_states='activate_celery')
def activate_celery(bot: TelegramBot, update: Update, state: TelegramState):
    pass
