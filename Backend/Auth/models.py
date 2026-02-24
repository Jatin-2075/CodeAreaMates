from django.db import models
from django.contrib.auth.models import User
import uuid


class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="details")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.user.username


class ProfileTable(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    name = models.CharField(max_length=30)
    age = models.IntegerField()
    branch = models.CharField(max_length=30)
    year = models.IntegerField()
    bio = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username


class EventTable(models.Model):
    name = models.CharField(max_length=80)
    description = models.TextField(blank=True)
    date = models.DateField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_events")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ParticipationRequestTable(models.Model):
    STATUS_CHOICES = [
        ("pending","Pending"),
        ("approved","Approved"),
        ("rejected","Rejected"),
    ]

    ROLE_CHOICES = [
        ("leader","Leader"),
        ("member","Member"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    message = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)


class ParticipationTable(models.Model):
    ROLE_CHOICES = [
        ("leader","Leader"),
        ("member","Member"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    collaboration_rating = models.IntegerField(default=0)

    class Meta:
        unique_together = ("user","event")


class AchievementTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    title = models.CharField(max_length=40)
    description = models.CharField(max_length=100)
    date = models.DateField()


class StoryTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    title = models.CharField(max_length=120)
    content = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class StoryImageTable(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="story_images/")


class StoryLikeTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user","story")


class StoryCommentTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)