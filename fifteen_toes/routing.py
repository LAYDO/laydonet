from django.urls import re_path
from fifteen_toes.consumers import FifteenToesConsumer

websocket_urlpatterns = [
    re_path(r'^ws/game/(?P<game_id>\w+)/$', FifteenToesConsumer.as_asgi()),
]