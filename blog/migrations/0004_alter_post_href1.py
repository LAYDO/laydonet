# Generated by Django 4.0.3 on 2022-10-27 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_post_tweetcontent_post_tweethref'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='href1',
            field=models.TextField(),
        ),
    ]