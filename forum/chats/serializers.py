from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name")

class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.Reply
        fields = ["id", "user", "content"]

class ChatSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    formatted_timestamp = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = models.Chat
        fields = ["id", "user", "title", "content", "formatted_timestamp", "replies", "likes_count"]  # Replace 'likes' with 'likes_count'

    def get_formatted_timestamp(self, obj):
        return obj.timestamp.strftime("%B %d, %Y, %I:%M %p")
        
    def get_likes_count(self, obj):
        return obj.likes.count()