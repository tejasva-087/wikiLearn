from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from random_username.generate import generate_username
from .models import Chat, Reply
from django.shortcuts import redirect
from .serializers import ChatSerializer
import json

# Create your views here.


@csrf_exempt
def register(request):
    if request.method == "POST" and not request.user.is_authenticated:
        try:
            try:
                data = json.loads(request.body) if request.body else {}
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON format"}, status=400)
            username = data.get("email", generate_username(1)[0])
            name = data.get("name", generate_username(1)[0])
            password = "password123"
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            user = User.objects.create_user(
                username=username, password=password, first_name=name
            )
            user.is_active = True
            user.save()
            login(request, user)
            return redirect("forum")
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    if request.method == "GET" and not request.user.is_authenticated:
        # Generate a random username and return it as JSON
        random_name = generate_username(1)[0]
        username = User.objects.all().count()
        user = User.objects.create_user(
            username=username, password="password123", first_name=random_name
        )
        user.save()
        login(request, user)
        return redirect("forum")
    if request.user.is_authenticated:
        # User is already authenticated, redirect to the forum page
        return redirect("forum")
    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            return redirect("forum")
        try:
            data = json.loads(request.body) if request.body else {}
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        username = data.get("email")
        password = "password123"
        print(f"Username: {username}, Password: {password}")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("forum")
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({"message": "Logged out successfully"}, status=200)
    return JsonResponse({"error": "User not authenticated"}, status=401)


@csrf_exempt
def forum(request):
    if request.user.is_authenticated:
        chats = Chat.objects.all()
        chat_serializer = ChatSerializer(chats, many=True)
        chats = chat_serializer.data
        return JsonResponse(
            {
                "user": {"id": request.user.id, "first_name": request.user.first_name},
                "chats": chats,
            },
            status=200,
        )
    else:
        return redirect("register")


@csrf_exempt
def reply(request, chat_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            content = request.POST.get("content")
            chat = Chat.objects.get(id=chat_id)
            reply = Reply.objects.create(user=request.user, chat=chat, content=content)
            reply.save()
            return JsonResponse({"message": "Reply added successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")


@csrf_exempt
def CreateChat(request):
    if request.user.is_authenticated:
        if request.method == "POST":

            try:
                data = json.loads(request.body) if request.body else {}
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON format"}, status=400)
            title = data.get("title")
            content = data.get("content")
            chat = Chat.objects.create(user=request.user, title=title, content=content)
            chat.save()
            return JsonResponse({"message": "Chat created successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")


@csrf_exempt
def DeleteChat(request, chat_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            chat = Chat.objects.get(id=chat_id)
            chat.delete()
            return JsonResponse({"message": "Chat deleted successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")


@csrf_exempt
def UpdateChat(request, chat_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            title = request.POST.get("title")
            content = request.POST.get("content")
            chat = Chat.objects.get(id=chat_id)
            chat.title = title
            chat.content = content
            chat.save()
            return JsonResponse({"message": "Chat updated successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")


@csrf_exempt
def like_chat(request, chat_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            chat = Chat.objects.get(id=chat_id)
            chat.likes.add(request.user)
            chat.save()
            return JsonResponse({"message": "Chat liked successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")


@csrf_exempt
def unlike_chat(request, chat_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            chat = Chat.objects.get(id=chat_id)
            chat.likes.remove(request.user)
            chat.save()
            return JsonResponse({"message": "Chat unliked successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")


@csrf_exempt
def delete_reply(request, reply_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            reply = Reply.objects.get(id=reply_id)
            reply.delete()
            return JsonResponse({"message": "Reply deleted successfully"}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method"}, status=400)
    else:
        return redirect("register")
