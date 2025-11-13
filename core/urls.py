from django.urls import path
from . import views

urlpatterns = [
    path('pets/', views.pet_list_create),
    path('pets/<int:pk>/', views.pet_detail),

    path('shelters/', views.shelter_list_create),
    path('shelters/<int:pk>/', views.shelter_detail),
    
    path('users/', views.user_list_create),
    path('users/<int:pk>/', views.user_detail),

    path('adoptions/', views.adoption_list_create),
    path('adoptions/<int:pk>/', views.adoption_detail),
    
    path('vets/', views.vet_list_create),
    path('vets/<int:pk>/', views.vet_detail),

    path('medicalrecords/', views.medicalrecord_list_create),
    path('medicalrecords/<int:pk>/', views.medicalrecord_detail),

    path('vetappointments/', views.vetappointment_list_create),
    path('vetappointments/<int:pk>/', views.vetappointment_detail),

    path('donations/', views.donation_list_create),
    path('donations/<int:pk>/', views.donation_detail),
]
