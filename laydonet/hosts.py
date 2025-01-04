from django_hosts import patterns, host

host_patterns = patterns(
    "",
    host(r"www", "laydonet.urls", name="www"),
    host(r"ai", "ai.urls", name="ai"),
)
