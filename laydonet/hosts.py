from django_hosts import patterns, host

host_patterns = patterns(
    "",
    host(r"www", "laydonet.urls", name="www"),
    host(r"ai", "ai.urls", name="ai"),
)

# https://django-hosts.readthedocs.io/en/latest/reference.html#module-django_hosts.resolvers
