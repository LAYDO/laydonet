import json
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Recipe

def cookbook(request):
    return render(request, 'recipe_list.html')

def recipe_list(request):
    recipes = Recipe.objects.all().order_by('-created_on')
    result = build_recipe_list(recipes)
    return JsonResponse({"recipes": result})

def recipe_detail(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    return render(request, 'recipe_detail.html', {'recipe': recipe})

def recipe_search(request):
    query = request.GET.get('q')
    recipes = Recipe.objects.filter(title__icontains=query).order_by('-created_on')
    result = build_recipe_list(recipes)
    return JsonResponse({'recipes': result})

@require_http_methods(["POST"])
def recipe_add(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    title = body_data.get("title")
    category = body_data.get("category")
    ingredients = body_data.get("ingredients")
    time_required = body_data.get("time_required")
    instructions = body_data.get("instructions")
    image = None #body_data.FILES.get('image')
    recipe = {'title': title, 'category': category, 'ingredients': ingredients, 'time_required': time_required, 'instructions': instructions}
    Recipe.objects.create(title=title, category=category, ingredients=ingredients, time_required=time_required, instructions=instructions, image=image)
    recipes = Recipe.objects.all().order_by('-created_on')
    result = build_recipe_list(recipes)
    return JsonResponse({'message': 'Recipe added successfully!', 'recipe_created': recipe, 'recipes': result})

def build_recipe_list(recipes):
    result = []
    for recipe in recipes:
        result.append({
            'id': recipe.id,
            'title': recipe.title,
            'category': recipe.category,
            'ingredients': recipe.ingredients,
            'time_required': recipe.time_required,
            'instructions': recipe.instructions,
            'image': recipe.image.url if recipe.image else None,
            'created_on': recipe.created_on,
            'updated_on': recipe.updated_on
        })
    return result