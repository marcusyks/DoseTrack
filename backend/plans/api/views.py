from rest_framework.viewsets import ModelViewSet
from ..models import Plan, Medicine
from .serializers import PlanSerializer, MedicineSerializer

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
