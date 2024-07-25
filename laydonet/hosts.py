from django_hosts import patterns, host
from django.conf import settings

host_patterns = patterns(
    '', 
    host('localhost:8000', settings.ROOT_URLCONF, name='www'),
    host('ai.localhost:8000', 'ai.urls', name='ai',),
    )