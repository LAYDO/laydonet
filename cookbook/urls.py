from django.urls import path
from . import views

urlpatterns = [
    path('', views.cookbook, name='cookbook'),
    path('recipes/', views.recipe_list, name='recipe_list'),
    path('<int:pk>/', views.recipe_detail, name='recipe_detail'),
    path('search/', views.recipe_search, name='recipe_search'),
    path('add/', views.recipe_add, name='recipe_add'),
]