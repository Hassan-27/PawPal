from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import CustomUser, Shelter, Pet, Adoption, Donation, Veterinarian, VetAppointment, MedicalRecord

def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated or request.user.role != "ADMIN":
            return JsonResponse({"error": "Not authorized"}, status=403)
        return view_func(request, *args, **kwargs)
    return wrapper

# ---------------------------
# Shelter Endpoints
# ---------------------------
@csrf_exempt
@admin_required
def shelters(request):
    if request.method == "GET":
        data = list(Shelter.objects.values())
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        shelter = Shelter.objects.create(**body)
        return JsonResponse({"message": "Shelter created", "id": shelter.id})

@csrf_exempt
@admin_required
def shelter_detail(request, id):
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

    if request.method == "PUT":
        body = json.loads(request.body)
        for key, value in body.items():
            setattr(shelter, key, value)
        shelter.save()
        return JsonResponse({"message": "Shelter updated"})

    if request.method == "DELETE":
        shelter.delete()
        return JsonResponse({"message": "Shelter deleted"})


@csrf_exempt
def pets(request):
    if request.method == "GET":
        data = list(Pet.objects.values())
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        pet = Pet.objects.create(**body)
        return JsonResponse({"message": "Pet created", "id": pet.id})

@csrf_exempt
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
            "Shelter": pet.Shelter_id
        })

    if request.method == "PUT":
        body = json.loads(request.body)
        for key, value in body.items():
            setattr(pet, key, value)
        pet.save()
        return JsonResponse({"message": "Pet updated"})

    if request.method == "DELETE":
        pet.delete()
        return JsonResponse({"message": "Pet deleted"})

@csrf_exempt
def adoptions(request):
    if request.method == "GET":
        data = list(Adoption.objects.values())
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        adoption = Adoption.objects.create(**body)
        return JsonResponse({"message": "Adoption request created", "id": adoption.id})

@csrf_exempt
def donations(request):
    if request.method == "GET":
        data = list(Donation.objects.values())
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        donation = Donation.objects.create(**body)
        return JsonResponse({"message": "Donation recorded", "id": donation.id})

@csrf_exempt
def vets(request):
    if request.method == "GET":
        return JsonResponse(list(Veterinarian.objects.values()), safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        vet = Veterinarian.objects.create(**body)
        return JsonResponse({"message": "Vet created", "id": vet.id})

@csrf_exempt
def appointments(request):
    if request.method == "GET":
        return JsonResponse(list(VetAppointment.objects.values()), safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        app = VetAppointment.objects.create(**body)
        return JsonResponse({"message": "Appointment created", "id": app.id})

@csrf_exempt
def medical_records(request):
    if request.method == "GET":
        return JsonResponse(list(MedicalRecord.objects.values()), safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        record = MedicalRecord.objects.create(**body)
        return JsonResponse({"message": "Medical record created", "id": record.id})


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        role = data.get("role")

        if CustomUser.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=role
        )

        return JsonResponse({"message": "Registration successful"})


from django.contrib.auth import authenticate, login

@csrf_exempt
def user_login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        selected_role = data.get("role")

        user = authenticate(username=username, password=password)

        if user is None:
            return JsonResponse({"error": "Invalid username or password"}, status=400)

        if user.role.upper() != selected_role.upper():
            return JsonResponse({"error": "Incorrect role selected"}, status=400)

        login(request, user)

        return JsonResponse({
            "message": "Login successful",
            "role": user.role
        })
