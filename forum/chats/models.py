from django.db import models

# Create your models here.

class Chat(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField('auth.User', related_name='liked_chats', blank=True)

    def __str__(self):
        return f"{self.user.username}: {self.message[:20]}... ({self.timestamp})"
    
class Reply(models.Model):
    chat = models.ForeignKey(Chat, related_name='replies', on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.user.username}: {self.message[:20]}... ({self.timestamp})"