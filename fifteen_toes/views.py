from django.shortcuts import render
from django.http.response import JsonResponse
from home.views import user_info
from django.contrib.auth.decorators import user_passes_test

# Create your views here.

# Default view, auth only superusers
@user_passes_test(lambda user: user.is_superuser)
def fifteen_toes(request):
    return render(request, 'fifteen_toes_home.html',)

def check_for_match(request):
    match = {}
    current_user = request.user
    match.update({
        'user_id': current_user.id,
        'user_name': current_user.username,
    })
    return JsonResponse(match, safe=False)