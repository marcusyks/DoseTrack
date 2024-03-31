from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from ..models import TelegramState
from .serializers import TelegramStateSerializer

class TelegramStateViewSet(ModelViewSet):
    queryset = TelegramState.objects.all()
    serializer_class = TelegramStateSerializer
