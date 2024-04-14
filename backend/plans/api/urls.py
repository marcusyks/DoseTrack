from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PlanViewSet, MedicineViewSet, UserViewSet

plan_router = DefaultRouter()
plan_router.register(r'plans', PlanViewSet)
plan_router.register(r'medicines', MedicineViewSet)
plan_router.register(r'users', UserViewSet)

