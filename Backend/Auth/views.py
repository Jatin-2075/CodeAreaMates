from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import UserDetails
from .Serializers import (
    ProfileSerializer,
    EventSerializer,
    ParticipationRequestSerializer,
    ParticipationSerializer,
    AchievementSerializer,
    StorySerializer
)


@api_view(['POST'])
def FunctionSignup(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "").strip()

    if not username or not password:
        return Response({'success': False, 'msg': 'Missing username or password'})

    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'msg': 'User already exists'})

    user = User.objects.create_user(username=username, password=password)
    UserDetails.objects.create(user=user)

    return Response({'success': True, 'msg': 'Account created'})


def save_serializer(serializer_class, request):
    serializer = serializer_class(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({
            'success': True,
            'data': serializer.data
        })

    return Response({
        'success': False,
        'errors': serializer.errors
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveProfile(request):
    return save_serializer(ProfileSerializer, request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveEvent(request):
    return save_serializer(EventSerializer, request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveParticipationRequest(request):
    return save_serializer(ParticipationRequestSerializer, request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveParticipation(request):
    return save_serializer(ParticipationSerializer, request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveAchievement(request):
    return save_serializer(AchievementSerializer, request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveStory(request):
    return save_serializer(StorySerializer, request)