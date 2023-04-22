web: gunicorn laydonet.asgi:application --workers 2 --threads 8 --bind 0.0.0.0:8080
worker: celery -A laydonet worker -l debug info
beat: celery -A laydonet beat -l debug info --scheduler django_celery_beat.schedulers:DatabaseScheduler