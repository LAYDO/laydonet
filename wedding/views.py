from django.shortcuts import render

# Create your views here.
def wedding(request):
    return render(request, 'wedding.html', {})

def ourstory(request):
    return render(request, 'ourstory.html', {})