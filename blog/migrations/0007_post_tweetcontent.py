# Generated by Django 4.0.3 on 2022-10-27 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_alter_post_content2_alter_post_content3_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tweetContent',
            field=models.TextField(blank=True),
        ),
    ]
