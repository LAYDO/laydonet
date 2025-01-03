from django.contrib import admin
from django.urls import path, include
from ai.views import chat, userChat, provideModels

urlpatterns = [
    path("", chat, name="ai"),
    # path("admin/", admin.site.urls),
    path("get-models/", provideModels, name="getModels"),
    path("chat/<ai_id>/", userChat, name="userChat"),
]
