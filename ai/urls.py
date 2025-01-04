from django.contrib import admin
from django.urls import path, include
from ai.views import chat, userChat, provideModels
from home.views import home
from users.views import register
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path("", chat, name="ai"),
    path("home/", home, name="home"),
    path("register/", register, name="register"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("accounts/logout/", LogoutView.as_view(), name="logout"),
    # path("admin/", admin.site.urls),
    path("get-models/", provideModels, name="getModels"),
    path("chat/<ai_id>/", userChat, name="userChat"),
]
