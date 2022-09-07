from django.shortcuts import render
from django.http import JsonResponse
from mtgsdk import Card

# Create your views here.


def mtg(request):
    return render(request, 'mtg.html', {})


def getCards(request, name):
    colors = ''
    sets = ''
    cardSet = []
    for parm in request.GET:
        if (parm == 'color'):
            colors += str(request.GET[parm])
        elif (parm == 'set'):
            sets += str(request.GET[parm])
    mtgSet = Card.where(name=name, colors=colors, set=sets).all()
    for card in mtgSet:
        if (card.id):
            mtgCard = {
                "name": card.name,
                "imgUrl": card.image_url,
                "id": card.multiverse_id,
                "colors": card.colors,
                "manaCost": card.mana_cost,
                "set": card.set,
                "setName": card.set_name,
                "rulings": card.rulings,
            }
            cardSet.append(mtgCard)
    return JsonResponse(cardSet, safe=False)
