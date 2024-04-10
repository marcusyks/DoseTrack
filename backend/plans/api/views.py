from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication
from ..models import Plan, Medicine
from .serializers import PlanSerializer, MedicineSerializer

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    authentication_classes = [SessionAuthentication]  # Add SessionAuthentication for session-based authentication

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    authentication_classes = [SessionAuthentication]  # Add SessionAuthentication for session-based authentication
