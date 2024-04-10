from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
from ..models import TelegramState
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import Sess

class TelegramStateSerializer(ModelSerializer):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    class Meta:
        model = TelegramState
        fields = ["id","memory","name","telegram_chat_id","telegram_user_id"]
