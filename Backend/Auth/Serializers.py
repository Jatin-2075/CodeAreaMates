from rest_framework import serializers
from .models import Event  

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileTable
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTable
        fields = '__all__'

class ParticipationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParticipationRequestTable
        fields = '__all__'

class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParticipationTable
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementTable
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryTable
        fields = '__all__'
    
class StoryImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = StoryImageTable
        fields = '__all__'

class StoryLikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = StoryLikeTable 
        fields = '__all__'