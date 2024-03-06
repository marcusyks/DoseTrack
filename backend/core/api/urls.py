from rest_framework.routers import DefaultRouter
from plans.api.urls import plan_router
from django.urls import path, include

router = DefaultRouter()

# plans
router.registry.extend(plan_router.registry)

urlpatterns = [
    path('',include(router.urls))
]

# comments

# text



