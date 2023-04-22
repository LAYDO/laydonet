from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'laydonet.settings')

app = Celery('laydonet')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'load-tles-hourly': {
        'task': 'orbiter.tasks.load_tles_task',
        'schedule': crontab(minute=0, hour='*'),
    },
}
