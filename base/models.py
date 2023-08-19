from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.core.exceptions import ValidationError


def AgeValidation(value):
    if value <= 90:
        return value
    else:
        raise ValidationError()


def custom_callable():
    return {"passes": [], "swipes": []}


def custom_callable_books():
    return {"favourites": [], "bucket_list": [], "currently_reading": [], "genres": []}


"""
Custom user class
CustomUser : {
    first_name: string,
    last_name: string,
    email: string,
    image: string,
    age: Integer,
    passes_swipes: {
        passes: List[string],
        swipes: List[string]
    },
    matches: List[string],
    matches_prev_len: Integer,
    books: {
        favourites: List[string],
        bucket_list: List[string],
        currently_reading: List[string],
        genres: List[string]
    }
}
"""


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=100, unique=True, null=True, blank=True)

    image = models.CharField(max_length=500, null=True, blank=True, default="")
    age = models.IntegerField(blank=True, validators=[AgeValidation], null=True)
    passes_swipes = models.JSONField(null=True, default=custom_callable)
    matches = models.JSONField(null=True, default=[], blank=True)
    matches_prev_len = models.IntegerField(null=True, default=0)
    books = models.JSONField(null=True, blank=True, default=custom_callable_books)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"


"""
Match Object
id is the unique identifier of a match between two users
"""


class Match(models.Model):
    id = models.CharField(max_length=301, unique=True, primary_key=True)


"""
Message object
Each message object is related to a match object by a many-to-one relationship 
(a match can have multiple messages, a message can only belong to one match)
"""


class Message(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.CharField(max_length=150)
    content = models.TextField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    image = models.CharField(max_length=500, null=True, blank=True, default="")
