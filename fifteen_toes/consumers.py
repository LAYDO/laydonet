import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
# from fifteen_toes.models import Game
from django.utils import timezone
from django.apps import apps

class FifteenToesConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.game_group_id = 'game_%s' % self.game_id

        await self.channel_layer.group_add(
            self.game_group_id,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print('Disconnected')
        await self.channel_layer.group_discard(
            self.game_group_id,
            self.channel_name
        )

    async def receive_json(self, response):
        try:
            if response['type'] == 'move':
                game_id = response.get('game_id', None)
                space = response.get('space', None)
                play = response.get('play', None)

                game = await self.get_game_instance(game_id)

                if game.round % 2 == 0 and play % 2 != 0:
                    raise Exception("It is Player 2's turn!")
                if game.round % 2 != 0 and play % 2 == 0:
                    raise Exception("It is Player 1's turn!")
                if game.spaces[space] != 0:
                    raise Exception('Square is already occupied')
                if game.round % 2 == 0 and play % 2 != 0:
                    raise Exception('Wrong number for the round. Should be an even from Player 2.')
                if game.round % 2 != 0 and play % 2 == 0:
                    raise Exception('Wrong number for the round. Should be an odd from Player 1.')

                newPlays = game.plays
                newPlays.append(play)
                newSpaces = game.spaces
                newSpaces[space] = play
                newRound = game.round + 1

                game.plays = newPlays
                game.spaces = newSpaces
                game.round = newRound

                if (self.checkWin(game)):
                    game.status = 'COMPLETED'
                    if (play % 2 == 0):
                        game.winner = game.player_two
                        game.loser = game.player_one
                    else:
                        game.winner = game.player_one
                        game.loser = game.player_two
                    game.ended = str(timezone.now())
                    game.save()
                    await self.channel_layer.group_send(self.game_group_id, {
                        'type': 'redirect',
                        'message': {
                            'url': '/fifteen_toes/post/'
                        }
                    })

                game.save()

                await self.channel_layer.group_send(self.game_group_id, {
                    'type': 'send_message',
                    'message': {
                        'space': space,
                        'play': play
                    }
                })
        except Exception as e:
            await self.channel_layer.group_send(self.game_group_id, {
                'type': 'error_message',
                'message': str(e)
            })

    async def send_message(self, res):
        await self.send(text_data=json.dumps({
            "payload": res,
        }))

    async def get_game_instance(self, game_id):
        Game = apps.get_model('fifteen_toes', 'Game')
        # Retrieve the model instance from the database
        try:
            game = await self.scope['django_db'].sync_to_async(
                Game.objects.get,
                thread_sensitive=True
            )(id=game_id)
            return game
        except Game.DoesNotExist:
            return None
        
    async def checkWin(self, game):
        if game.round <= 9:
            for i in game.winningArrays:
                temp = list()
                for x in i:
                    if game.spaces[x] != 0:
                        temp.append(game.spaces[x])
                if len(set(temp)) == 3 and sum(temp) == 15:
                    return True
                temp.clear()
        return False