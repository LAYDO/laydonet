from django.contrib import admin
from django.urls import path, include, re_path
from ai.views import chat, userChat, provideModels
from home.views import home
from users.views import register
from resume.views import resume
from about.views import about
from blog.views import PostList, PostDetail
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path("", chat, name="ai"),
    path("home/", home, name="home"),
    path("register/", register, name="register"),
    path("resume/", resume, name="resume"),
    path("about/", about, name="about"),
    path("blog/", PostList.as_view(), name="blog"),
    path("blog/<slug:slug>/", PostDetail.as_view(), name="post_detail"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("accounts/logout/", LogoutView.as_view(), name="logout"),
    # path("admin/", admin.site.urls),
    path("get-models/", provideModels, name="getModels"),
    re_path(r"^chat/(?P<ai_id>.+)/$", userChat, name="userChat"),
]
