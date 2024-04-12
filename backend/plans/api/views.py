from rest_framework.viewsets import ModelViewSet
from ..models import Plan, Medicine
from .serializers import PlanSerializer, MedicineSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

