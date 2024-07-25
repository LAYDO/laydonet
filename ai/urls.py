from django.contrib import admin
from django.urls import path, include
from ai.views import chat, userChat

urlpatterns = [
    path("", chat, name="ai"),
    path("admin/", admin.site.urls),
    path("chat/<ai_id>/", userChat, name="userChat"),
    path("users/", include("users.urls")),
]
