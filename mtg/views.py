from urllib.error import HTTPError
from urllib.parse import urlencode
from django.shortcuts import render
from django.http import JsonResponse
from urllib.request import Request, urlopen
import json

# Create your views here.
__endpoint__ = "https://api.magicthegathering.io/v1"
RESOURCE = 'cards'

def mtg(request):
    return render(request, 'mtg.html', {})


def getCards(request):
    url = "{}/{}".format(__endpoint__, RESOURCE)
    request_url = url
    colors = ''
    sets = ''
    cardSet = []

    if len(request.GET) > 0:
        request_url = "{}?{}".format(url, urlencode(request.GET))
        print(request_url)
    try:
        req = Request(request_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = json.loads(urlopen(req).read().decode("utf-8"))[RESOURCE]
    except HTTPError as err:
        raise Exception(err.read())
    if len(response) > 0:
        for card in response:
            if (card['id']):
                cardSet.append(card)
    return JsonResponse(cardSet, safe=False)
