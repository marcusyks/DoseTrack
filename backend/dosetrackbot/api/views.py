from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import TelegramState
from .serializers import TelegramStateSerializer

class TelegramStateViewSet(ModelViewSet):
    queryset = TelegramState.objects.all()
    serializer_class = TelegramStateSerializer
