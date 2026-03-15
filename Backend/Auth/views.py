from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserDetails, EventTable, StoryTable, ProfileTable, ParticipationTable
from .Serializers import (
    ProfileSerializer,
    EventSerializer,
    ParticipationRequestSerializer,
    ParticipationSerializer,
    AchievementSerializer,
    StorySerializer
)


# ================= AUTH =================

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


@api_view(['POST'])
def FunctionLogin(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "").strip()

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'success': False, 'msg': 'Invalid credentials'})

    refresh = RefreshToken.for_user(user)

    return Response({
        'success': True,
        'token': str(refresh.access_token),
        'username': user.username
    })


# ================= GENERIC SAVE =================

def save_serializer(serializer_class, request):
    serializer = serializer_class(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data})
    return Response({'success': False, 'errors': serializer.errors})


# ================= CREATE APIs =================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveProfile(request):
    profile, created = ProfileTable.objects.update_or_create(
        user=request.user,
        defaults={
            'name': request.data.get('name', ''),
            'age': request.data.get('age', 0),
            'branch': request.data.get('branch', ''),
            'year': request.data.get('year', 0),
            'bio': request.data.get('bio', ''),
        }
    )
    serializer = ProfileSerializer(profile)
    return Response({'success': True, 'data': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveEvent(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response({'success': True, 'data': serializer.data})
    return Response({'success': False, 'errors': serializer.errors})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveParticipationRequest(request):
    serializer = ParticipationRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({'success': True, 'data': serializer.data})
    return Response({'success': False, 'errors': serializer.errors})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveParticipation(request):
    serializer = ParticipationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({'success': True, 'data': serializer.data})
    return Response({'success': False, 'errors': serializer.errors})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveAchievement(request):
    serializer = AchievementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({'success': True, 'data': serializer.data})
    return Response({'success': False, 'errors': serializer.errors})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FunctionSaveStory(request):
    serializer = StorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({'success': True, 'data': serializer.data})
    return Response({'success': False, 'errors': serializer.errors})


# ================= GET =================

def get_serializer(serializer_class, queryset):
    serializer = serializer_class(queryset, many=True)
    return Response({'success': True, 'data': serializer.data})


# ================= READING APIs ================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FunctionGetProfile(request):
    try:
        profile = ProfileTable.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response({'success': True, 'data': serializer.data})
    except ProfileTable.DoesNotExist:
        return Response({'success': False, 'msg': 'Profile not found'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FunctionGetEvents(request):
    events = EventTable.objects.all().order_by('-id')
    return get_serializer(EventSerializer, events)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FunctionGetStories(request):
    stories = StoryTable.objects.all().order_by('-id')
    return get_serializer(StorySerializer, stories)


# ================= MATES =================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FunctionGetMates(request):
    users = User.objects.exclude(id=request.user.id).order_by('username')

    data = []
    for user in users:
        data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })

    return Response({'success': True, 'data': data})


# ================= PAST EVENTS =================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FunctionGetPastEvents(request):
    today = timezone.now().date()

    events = EventTable.objects.filter(
        date__lt=today
    ).order_by('-date')

    data = []
    for event in events:
        data.append({
            'id': event.id,
            'title': event.name,
            'date': str(event.date),
            'description': event.description,
        })

    return Response({'success': True, 'data': data})


# ================= DELETE =================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def FunctionDeleteStory(request, id):
    try:
        story = StoryTable.objects.get(id=id, user=request.user)
        story.delete()
        return Response({'success': True})
    except StoryTable.DoesNotExist:
        return Response({'success': False, 'msg': 'Not found'})