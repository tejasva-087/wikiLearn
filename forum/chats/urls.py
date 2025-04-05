from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login_view, name='login'),
    path('register', views.register, name='register'),
    path('', views.forum, name='forum'),
    path('logout', views.logout_view, name='logout'),
    path("reply/<int:chat_id>/", views.reply, name="reply"),
    path("like/<int:chat_id>/", views.like_chat, name="like"),
    path("delete/<int:chat_id>/", views.DeleteChat, name="delete"),
    path("create", views.CreateChat, name="create"),
    path("update/<int:chat_id>/", views.UpdateChat, name="update"),
    path("like/<int:chat_id>/", views.like_chat, name="like_chat"),
    path("unlike/<int:chat_id>/", views.unlike_chat, name="unlike_chat"),
    path("delete_reply/<int:reply_id>/", views.delete_reply, name="delete_reply"),

]