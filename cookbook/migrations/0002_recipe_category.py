# Generated by Django 5.0.7 on 2024-11-24 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cookbook", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="recipe",
            name="category",
            field=models.CharField(default="", max_length=255),
        ),
    ]
