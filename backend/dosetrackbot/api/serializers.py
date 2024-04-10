from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
from ..models import TelegramState
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

class TelegramStateSerializer(ModelSerializer):
    class Meta:
        model = TelegramState
        fields = ["id","memory","name","telegram_chat_id","telegram_user_id"]
