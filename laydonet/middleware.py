from django.conf import settings

class SubdomainMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host().split(':')[0]
        subdomain = host.split('.')[0]
        
        # Set dynamic login URLs based on subdomain
        if subdomain == 'ai':
            request.subdomain = 'ai'
            request.login_redirect = 'ai'
            request.logout_redirect = 'ai'
        else:
            request.subdomain = 'www'
            request.login_redirect = 'home'
            request.logout_redirect = 'home'
        
        response = self.get_response(request)
        return response