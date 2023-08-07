from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["image"] = user.image
        token["age"] = user.age
        token["passes_swipes"] = user.passes_swipes
        token["matches"] = user.matches
        token["matches_prev_len"] = user.matches_prev_len
        token["books"] = user.books
        # ...

        return token
