"""stock_chart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView
from django.http import JsonResponse
import urllib2
import json

ROOT_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/'
TAIL = '/data.json?start_date=2018-01-01'
API_KEY = '&api_key=zC992yeEkw5VTye5PFJY'

def quandle_request_handler (request):
    # print request.GET['stock_code']
    url = ROOT_URL + request.GET['stock_code'] + TAIL + API_KEY
    response = urllib2.urlopen(url).read()
    content = json.loads(response)
    return JsonResponse(content)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/$', quandle_request_handler),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
