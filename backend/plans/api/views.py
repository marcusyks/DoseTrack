from rest_framework.viewsets import ModelViewSet
from ..models import Plan, Medicine, User
from .serializers import PlanSerializer, MedicineSerializer, UserSerializer


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

