# Generated by Django 4.0.3 on 2023-02-01 02:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fifteen_toes', '0002_game_created_game_ended_game_loser_game_player_one_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lobby',
            fields=[
                ('lobby_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=10)),
                ('player_one', models.IntegerField(blank=True, default=0)),
                ('p1_status', models.CharField(max_length=10)),
                ('player_two', models.IntegerField(blank=True, default=0)),
                ('p2_status', models.CharField(max_length=10)),
                ('game_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fifteen_toes.game')),
            ],
        ),
    ]