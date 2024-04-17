from django.contrib import admin
from .models import ActivityTracking, GoalsDreams, UserProfile

# Register your models here.

admin.site.register(ActivityTracking)
admin.site.register(GoalsDreams)
admin.site.register(UserProfile)
