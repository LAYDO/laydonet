from django.shortcuts import render


# Create your views here.
def webgl(request):
    return render(request, "webgl.html")