from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from blog.views import MyTokenObtainPairView  # Import your custom token view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Use custom view here
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
