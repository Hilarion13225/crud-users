from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from .auth import LoginView
from django.urls import path

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls + [
    path('login/', LoginView.as_view()),
]
