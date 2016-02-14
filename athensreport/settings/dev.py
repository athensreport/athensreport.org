from base import *

ENVIRONMENT = 'dev'

# Debug
DEBUG = True
INTERNAL_IPS = ('127.0.0.1',)

# Mail
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
