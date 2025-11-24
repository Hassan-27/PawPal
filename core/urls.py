from django.contrib import admin
from django.urls import path
from core import api

urlpatterns = [
    path("admin/", admin.site.urls),

    # -------------------------------
    # AUTHENTICATION
    # -------------------------------
    path("api/register/", api.register),
    path("api/login/", api.user_login),

    # -------------------------------
    # USER READ-ONLY ENDPOINTS
    # -------------------------------
    path("api/shelters/", api.shelters_view),
    path("api/shelters/<int:id>/", api.shelter_view),

    path("api/pets/", api.pets),
    path("api/pets/<int:id>/", api.pet_detail),

    path("api/vets/view/", api.vets_view),

    # -------------------------------
    # USER PERSONAL DATA ENDPOINTS
    # -------------------------------
    path("api/adoptions/", api.adoptions),
    path("api/donations/", api.donations),

    path("api/appointments/my/", api.my_appointments),
    path("api/medical-records/my/", api.my_medical_records),

    # -------------------------------
    # ADMIN-ONLY ENDPOINTS
    # -------------------------------
    # Shelters Admin
    path("api/admin/shelters/", api.shelters_admin),
    path("api/admin/shelters/<int:id>/", api.shelter_detail_admin),

    # Pets Admin
    path("api/admin/pets/", api.pets_admin),
    path("api/admin/pets/<int:id>/", api.pet_detail_admin),

    # Vets Admin
    path("api/admin/vets/", api.vets),

    # Appointments Admin
    path("api/admin/appointments/", api.appointments),

    # Medical Records Admin
    path("api/admin/medical-records/", api.medical_records),
]
