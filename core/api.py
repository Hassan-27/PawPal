from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    CustomUser, Shelter, Pet, Adoption, Donation,
    Veterinarian, VetAppointment, MedicalRecord
)


# ---------------------------------------------------
# AUTH DECORATORS
# ---------------------------------------------------

def login_required_api(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper


def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)

        if request.user.role != "ADMIN":
            return JsonResponse({"error": "Admin access only"}, status=403)

        return view_func(request, *args, **kwargs)
    return wrapper


# ---------------------------------------------------
# AUTH ENDPOINTS
# ---------------------------------------------------

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        if CustomUser.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            role="ADOPTER"  # default role
        )

        return JsonResponse({"message": "Registration successful"})


@csrf_exempt
def user_login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return JsonResponse({"error": "Invalid username or password"}, status=400)

        # Create JWT tokens for the authenticated user
        refresh = RefreshToken.for_user(user)

        # Optionally also log in the user to create a session cookie
        login(request, user)

        return JsonResponse({
            "message": "Login successful",
            "role": user.role,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


# ---------------------------------------------------
# USER READ-ONLY ENDPOINTS
# ---------------------------------------------------

@csrf_exempt
@login_required_api
def shelters_view(request):
    if request.method == "GET":
        return JsonResponse(list(Shelter.objects.values()), safe=False)


@csrf_exempt
@login_required_api
def shelter_view(request, id):
    try:
        shelter = Shelter.objects.get(id=id)
    except Shelter.DoesNotExist:
        return JsonResponse({"error": "Shelter not found"}, status=404)

    if request.method == "GET":
        return JsonResponse({
            "id": shelter.id,
            "Name": shelter.Name,
            "Location": shelter.Location,
            "Contact": shelter.Contact,
        })


@csrf_exempt
@login_required_api
def pets(request):
    if request.method == "GET":
        return JsonResponse(list(Pet.objects.values()), safe=False)


@csrf_exempt
@login_required_api
def pet_detail(request, id):
    try:
        pet = Pet.objects.get(id=id)
    except Pet.DoesNotExist:
        return JsonResponse({"error": "Pet not found"}, status=404)

    if request.method == "GET":
        return JsonResponse({
            "id": pet.id,
            "Name": pet.Name,
            "Species": pet.Species,
            "Breed": pet.Breed,
            "Age": pet.Age,
            "Gender": pet.Gender,
            "Status": pet.Status,
            "Shelter": pet.Shelter_id,
        })


# ---------------------------------------------------
# USER ACTION ENDPOINTS
# ---------------------------------------------------

@csrf_exempt
@login_required_api
def adoptions(request):
    if request.method == "GET":
        if request.user.role == "ADMIN":
            data = list(Adoption.objects.values())
        else:
            data = list(Adoption.objects.filter(Adopter=request.user).values())

        return JsonResponse(data, safe=False)

    if request.method == "POST":
        data = json.loads(request.body)

        adoption = Adoption.objects.create(
            Pet_id=data.get("Pet"),
            Adopter=request.user,
            Status="pending"
        )

        return JsonResponse({"message": "Adoption request created", "id": adoption.id})


@csrf_exempt
@login_required_api
def donations(request):
    if request.method == "GET":
        if request.user.role == "ADMIN":
            data = list(Donation.objects.values())
        else:
            data = list(Donation.objects.filter(User=request.user).values())

        return JsonResponse(data, safe=False)

    if request.method == "POST":
        data = json.loads(request.body)

        donation = Donation.objects.create(
            Shelter_id=data.get("Shelter"),
            User=request.user,
            Amount=data.get("Amount")
        )

        return JsonResponse({"message": "Donation recorded", "id": donation.id})


# ---------------------------------------------------
# USER VIEW: VETS
# ---------------------------------------------------

@csrf_exempt
@login_required_api
def vets_view(request):
    if request.method == "GET":
        return JsonResponse(list(Veterinarian.objects.values()), safe=False)


# ---------------------------------------------------
# USER VIEW: THEIR APPOINTMENTS
# ---------------------------------------------------

@csrf_exempt
@login_required_api
def my_appointments(request):
    if request.method == "GET":

        user_pet_ids = Adoption.objects.filter(
            Adopter=request.user,
            Status="approved"
        ).values_list("Pet_id", flat=True)

        data = list(
            VetAppointment.objects.filter(Pet_id__in=user_pet_ids).values()
        )

        return JsonResponse(data, safe=False)


# ---------------------------------------------------
# USER VIEW: THEIR MEDICAL RECORDS
# ---------------------------------------------------

@csrf_exempt
@login_required_api
def my_medical_records(request):
    if request.method == "GET":

        user_pet_ids = Adoption.objects.filter(
            Adopter=request.user,
            Status="approved"
        ).values_list("Pet_id", flat=True)

        data = list(
            MedicalRecord.objects.filter(Pet_id__in=user_pet_ids).values()
        )

        return JsonResponse(data, safe=False)


# ---------------------------------------------------
# ADMIN-ONLY CRUD ENDPOINTS
# ---------------------------------------------------

# ---------- Shelters (Admin) ----------

@csrf_exempt
@admin_required
def shelters_admin(request):
    if request.method == "GET":
        return JsonResponse(list(Shelter.objects.values()), safe=False)

    if request.method == "POST":
        data = json.loads(request.body)
        shelter = Shelter.objects.create(**data)
        return JsonResponse({"message": "Shelter created", "id": shelter.id})


@csrf_exempt
@admin_required
def shelter_detail_admin(request, id):
    try:
        shelter = Shelter.objects.get(id=id)
    except Shelter.DoesNotExist:
        return JsonResponse({"error": "Shelter not found"}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        for k, v in data.items():
            setattr(shelter, k, v)
        shelter.save()
        return JsonResponse({"message": "Shelter updated"})

    if request.method == "DELETE":
        shelter.delete()
        return JsonResponse({"message": "Shelter deleted"})


# ---------- Pets (Admin) ----------

@csrf_exempt
@admin_required
def pets_admin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pet = Pet.objects.create(**data)
        return JsonResponse({"message": "Pet created", "id": pet.id})


@csrf_exempt
@admin_required
def pet_detail_admin(request, id):
    try:
        pet = Pet.objects.get(id=id)
    except Pet.DoesNotExist:
        return JsonResponse({"error": "Pet not found"}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        for k, v in data.items():
            setattr(pet, k, v)
        pet.save()
        return JsonResponse({"message": "Pet updated"})

    if request.method == "DELETE":
        pet.delete()
        return JsonResponse({"message": "Pet deleted"})


# ---------- Veterinarians (Admin) ----------

@csrf_exempt
@admin_required
def vets(request):
    if request.method == "GET":
        return JsonResponse(list(Veterinarian.objects.values()), safe=False)

    if request.method == "POST":
        data = json.loads(request.body)
        vet = Veterinarian.objects.create(**data)
        return JsonResponse({"message": "Vet created", "id": vet.id})


# ---------- Appointments (Admin) ----------

@csrf_exempt
@admin_required
def appointments(request):
    if request.method == "GET":
        return JsonResponse(list(VetAppointment.objects.values()), safe=False)

    if request.method == "POST":
        data = json.loads(request.body)
        app = VetAppointment.objects.create(**data)
        return JsonResponse({"message": "Appointment created", "id": app.id})


# ---------- Medical Records (Admin) ----------

@csrf_exempt
@admin_required
def medical_records(request):
    if request.method == "GET":
        return JsonResponse(list(MedicalRecord.objects.values()), safe=False)

    if request.method == "POST":
        data = json.loads(request.body)
        record = MedicalRecord.objects.create(**data)
        return JsonResponse({"message": "Medical record created", "id": record.id})
