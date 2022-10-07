from django.shortcuts import render

# Create your views here.
def websites(request):
    return render(request, 'websites.html', {})