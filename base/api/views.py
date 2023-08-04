from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer
from ..serializers import UserSerializer, MessageSerializer, MatchSerializer
from ..models import CustomUser, Message, Match
from django.contrib.auth.hashers import make_password
import json


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# keys = [
#     "first_name",
#     "last_name",
#     "email",
#     "username",
#     "image",
#     "age",
#     "passes_swipes",
# ]


@api_view(["GET"])
def getRoutes(req):
    routes = ["api/token", "api/token/refresh"]
    return Response(routes)


@api_view(["POST", "GET"])
def register(req):
    if req.method == "POST":
        user = CustomUser.objects.create(username=req.data["username"])
        user.set_password(req.data["password"])
        user.save()
        return Response(user)

    else:
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


@api_view(["PUT", "GET"])
def update_user(req, pk):
    if req.method == "PUT":
        data = req.data
        user = CustomUser.objects.get(username=pk)
        serializer = UserSerializer(instance=user, data=data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    if req.method == "GET":
        user = CustomUser.objects.get(username=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


@api_view(["POST", "GET"])
def match(req):
    if req.method == "POST":
        serializer = MatchSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    if req.method == "GET":
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)


@api_view(["POST", "GET"])
def messages(req, pk):
    match = Match.objects.get(id=pk)
    if req.method == "GET":
        serializer = MessageSerializer(
            match.message_set.all().order_by("timestamp"), many=True
        )
        return Response(serializer.data)

    if req.method == "POST":
        message = Message(
            content=req.data["content"],
            sender=req.data["sender"],
            match=match,
            image=req.data["image"],
        )
        message.save()
        return Response("Success")
