from django.shortcuts import render
from django.http.response import HttpResponse

# Create your views here.
def home(request):
    return render(request, 'home.html', {})

def see_request(request):
    text = f"""
        Some attributes of the HttpRequest object:

        scheme: {request.scheme}
        path: {request.path}
        method: {request.method}
        GET: {request.GET}
        user: {request.user}
    """
    return HttpResponse(text, content_type='text/plain')

def user_info(request):
    text = f"""
        Some attributes of the HttpRequest object:

        username: {request.user.username}
        is_anonymous: {request.user.is_anonymous}
        is_staff: {request.user.is_staff}
        is_superuser: {request.user.is_superuser}
        is_active: {request.user.is_active}
    """
    return HttpResponse(text, content_type='text/plain')