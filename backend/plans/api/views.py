from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from ..models import Plan, Medicine
from .serializers import PlanSerializer, MedicineSerializer


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
