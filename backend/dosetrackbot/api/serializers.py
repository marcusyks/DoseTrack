<<<<<<< HEAD
from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
from ..models import TelegramState

class TelegramStateSerializer(ModelSerializer):
    class Meta:
        model = TelegramState
        fields = ["id","memory","name","telegram_chat_id","telegram_user_id"]
=======
from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
from ..models import TelegramState
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class TelegramStateSerializer(ModelSerializer):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    class Meta:
        model = TelegramState
        fields = ["id","memory","name","telegram_chat_id","telegram_user_id"]
>>>>>>> 78e0a92 (MVP v1:)
