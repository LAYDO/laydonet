from django.shortcuts import render

# Create your views here.
def fifteen_toes(request):
    return render(request, 'fifteen_toes_start.html')