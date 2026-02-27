from django.urls import path
from . import views

urlpatterns = [

    # AUTH
    path('signup/', views.FunctionSignup),
    path('login/', views.FunctionLogin),

    # CREATE
    path('profile/save/', views.FunctionSaveProfile),
    path('event/save/', views.FunctionSaveEvent),
    path('participation-request/save/', views.FunctionSaveParticipationRequest),
    path('participation/save/', views.FunctionSaveParticipation),
    path('achievement/save/', views.FunctionSaveAchievement),
    path('story/save/', views.FunctionSaveStory),

    # READ
    path('profile/', views.FunctionGetProfile),
    path('events/', views.FunctionGetEvents),
    path('stories/', views.FunctionGetStories),

    # DELETE
    path('story/delete/<int:id>/', views.FunctionDeleteStory),
]