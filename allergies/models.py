from django.db import models

# Create your models here.
class Allergies(models.Model):
    level = models.IntegerField(blank=True, null=True)
    category = models.CharField(max_length=20, blank=True, null=True)
    food = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'allergies'