from django.urls import path
from . import api

urlpatterns = [
    path("shelters/", api.shelters),
    path("shelters/<int:id>/", api.shelter_detail),

    path("pets/", api.pets),
    path("pets/<int:id>/", api.pet_detail),

    path("adoptions/", api.adoptions),
    path("donations/", api.donations),

    path("vets/", api.vets),
    path("appointments/", api.appointments),

    path("medical-records/", api.medical_records),
    
    path("register/", api.register),
    path("login/", api.user_login),

]
