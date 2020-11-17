from logui_apps.errorhandling import views as error_views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('firstrun/', include('logui_apps.firstrun.urls')),
    path('', include('logui_apps.control.urls')),
]

handler404 = error_views.Error404View.as_view()
handler500 = error_views.Error500View.as_view()