from rest_framework.viewsets import ModelViewSet
<<<<<<< HEAD
from ..models import Plan, Medicine
from .serializers import PlanSerializer, MedicineSerializer
=======
from ..models import Plan, Medicine, User
from .serializers import PlanSerializer, MedicineSerializer, UserSerializer

>>>>>>> 71f6af9 (MVP)

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
<<<<<<< HEAD
=======

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

>>>>>>> 71f6af9 (MVP)
