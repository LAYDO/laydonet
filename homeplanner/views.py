from django.shortcuts import render

# Create your views here.
def planner(request):
    return render(request, 'planner.html', {})