from django.db import models

# Create your models here.
class Satellite(models.Model):
    name = models.CharField(max_length=100)
    tle_line1 = models.CharField(max_length=100)
    tle_line2 = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name