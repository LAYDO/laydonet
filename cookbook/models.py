from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255, default='')
    ingredients = ArrayField(models.CharField(max_length=100), default=list)
    time_required = models.IntegerField()
    instructions = ArrayField(models.TextField(), default=list)
    image = models.ImageField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title