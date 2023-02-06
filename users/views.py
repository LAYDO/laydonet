from django.shortcuts import render, redirect
from users.forms import CustomUserCreationForm
from django.urls import reverse
from django.contrib.auth import login

# Create your views here.

def dashboard(request):
    return render(request, 'dashboard.html')

def register(request):
    if request.method == 'GET':
        return render(request, 'users/register.html', {'form': CustomUserCreationForm})
    elif request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(reverse('home'))