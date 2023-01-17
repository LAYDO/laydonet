from django.shortcuts import render
from django.http.response import JsonResponse

# Create your views here.
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