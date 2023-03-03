from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone


# Create your models here.
class Game(models.Model):
    winningArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    game_id = models.BigAutoField(primary_key=True)
    status = models.CharField(max_length=10)
    player_one = models.IntegerField(blank=True, default=0)
    p1_status = models.CharField(max_length=10, default='UNREADY')
    player_two = models.IntegerField(blank=True, default=0)
    p2_status = models.CharField(max_length=10, default='UNREADY')
    round = models.IntegerField(default=0)
    plays = ArrayField(models.IntegerField(blank=True), size=9, default=list)
    spaces = ArrayField(models.IntegerField(blank=True), size=9, default=list)
    winner = models.IntegerField(blank=True, default=0)
    loser = models.IntegerField(blank=True, default=0)
    privacy = models.CharField(max_length=7, default='Public')
    password = models.CharField(max_length=15, default='')
    created = models.DateTimeField(default=timezone.now)
    ended = models.DateTimeField(default=timezone.now)

class PlayerStats(models.Model):
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    ties = models.IntegerField(default=0)
    games_played = models.IntegerField(default=0)
    games_finished = models.IntegerField(default=0)
    games_forfeited = models.IntegerField(default=0)
    win_percent = models.DecimalField(decimal_places=2,max_digits=3, default=0)
    loss_percent = models.DecimalField(decimal_places=2,max_digits=3, default=0)

class GameArchive(models.Model):
    archive_id: models.BigAutoField(primary_key=True)
    game_id: models.BigIntegerField(blank=False)
    player_one = models.IntegerField(blank=False, default=0)
    p1_status = models.CharField(max_length=10, default='COMPLETED')
    player_two = models.IntegerField(blank=False, default=0)
    p2_status = models.CharField(max_length=10, default='COMPLETED')
    plays: ArrayField(models.IntegerField(blank=False), size=9)
    spaces: ArrayField(models.IntegerField(blank=False), size=9)
    winner: models.IntegerField(blank=False)
    loser: models.IntegerField(blank=False)
    created = models.DateTimeField()
    ended = models.DateTimeField()