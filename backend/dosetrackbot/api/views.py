<<<<<<< HEAD
<<<<<<< HEAD
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from ..models import TelegramState
from .serializers import TelegramStateSerializer

class TelegramStateViewSet(ModelViewSet):
    queryset = TelegramState.objects.all()
    serializer_class = TelegramStateSerializer
=======
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import TelegramState
from .serializers import TelegramStateSerializer

class TelegramStateViewSet(ModelViewSet):
    queryset = TelegramState.objects.all()
    serializer_class = TelegramStateSerializer
    permission_classes = [IsAuthenticated]
>>>>>>> 2b6b674 (MVP)
=======
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from ..models import TelegramState
from .serializers import TelegramStateSerializer

class TelegramStateViewSet(ModelViewSet):
    queryset = TelegramState.objects.all()
    serializer_class = TelegramStateSerializer
    permission_classes = [IsAuthenticated]
>>>>>>> b2c07b6 (MVP v1)
