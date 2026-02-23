from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import UserDetails, Profile, Event, Achievement, Participation 

@api_view(['POST'])
def FunctionSignup(request):
    username = request.data.get("username","").strip()
    password = request.data.get("password","").strip()

    if not username or not password:
        return Response({'message': "Data Didn't Reach", "success": False})

    if User.objects.filter(username=username).exists():
        return Response({"success": False, "msg": "User Already Exists"})

    user = User.objects.create_user(username=username, password=password)

    UserDetails.objects.create(user=user)

    return Response({"success": True, "msg": "Profile Created"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveProfile(request):
    data = request.data

    if not data :
        return Response({'success' : False, "msg" : "Data Didn't Reached"})

     