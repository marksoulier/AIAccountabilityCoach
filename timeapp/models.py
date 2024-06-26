# create models here for time app
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subscription = models.BooleanField(default=False)
    description = models.TextField()
    dark_mode = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s profile"


# Activity Tracking Model
class ActivityTracking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.CharField(max_length=100)
    hours_spent = models.FloatField()
    day_of_week = models.CharField(max_length=9)


# Goals and Dreams Model
class GoalsDreams(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal_id = models.AutoField(primary_key=True)
    goaltitle = models.TextField(default="")
    description = models.TextField(default="")
    achieved = models.BooleanField(
        default=False
    )  # Indicates if the goal has been achieved
    hours_spent = models.DecimalField(
        max_digits=5, decimal_places=2, default=0.00
    )  # Hours spent towards achieving the goal
    hours_required = models.DecimalField(
        max_digits=5, decimal_places=2, default=0.00
    )  # Estimated hours required to achieve the goal
    date_time = models.DateTimeField(
        default=timezone.now
    )  # Date and time the goal was created or for a deadline
    # have the ability to link a goal to others emails
    connected_emails = models.TextField(default="")

    # maybe a scoring system for goals
    incentive = models.TextField(default="")

    def __str__(self):
        return self.goaltitle
