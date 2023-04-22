from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .views import load_tles

@shared_task
def load_tles_task():
    urlSS = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle'
    url30 = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&FORMAT=tle'
    urlSL = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle'
    load_tles(urlSS)
