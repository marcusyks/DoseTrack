<<<<<<< HEAD
<<<<<<< HEAD
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PlanViewSet, MedicineViewSet

plan_router = DefaultRouter()
plan_router.register(r'plans', PlanViewSet)
plan_router.register(r'medicines', MedicineViewSet)
=======
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PlanViewSet, MedicineViewSet
from dosetrackbot.api.views import TelegramStateViewSet

plan_router = DefaultRouter()
plan_router.register(r'plans', PlanViewSet)
plan_router.register(r'medicines', MedicineViewSet)
plan_router.register(r'states', TelegramStateViewSet)
>>>>>>> b6fa0ea (MVP v1:)
=======
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PlanViewSet, MedicineViewSet, UserViewSet

plan_router = DefaultRouter()
plan_router.register(r'plans', PlanViewSet)
plan_router.register(r'medicines', MedicineViewSet)
plan_router.register(r'users', UserViewSet)
>>>>>>> 71f6af9 (MVP)
