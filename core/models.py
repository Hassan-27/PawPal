from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.

# ------------------------
# Custom User Model
# ------------------------
class User(AbstractUser):
    Role = models.CharField(max_length=20, default="admin")
    CreatedAt = models.DateTimeField(auto_now_add=True)  # auto timestamp on creation

    # Fix ManyToMany conflicts
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='core_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='core_user_permissions_set',
        blank=True
    )

# ------------------------
# Shelter
# ------------------------
class Shelter(models.Model):
    Name = models.CharField(max_length=100, default="unknown")
    Location = models.CharField(max_length=150, default="unknown")
    Contact = models.CharField(max_length=50, default="unknown")
    CreatedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Name

# ------------------------
# Pet
# ------------------------
class Pet(models.Model):
    Name = models.CharField(max_length=100, default="unknown")
    Species = models.CharField(max_length=50, default="unknown")
    Breed = models.CharField(max_length=100, default="unknown")
    Age = models.IntegerField(default=0)
    Gender = models.CharField(max_length=10, default="unknown")
    Status = models.CharField(max_length=20, default="available")
    Shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='pets')
    CreatedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Name

# ------------------------
# Adoption
# ------------------------
class Adoption(models.Model):
    Pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='adoptions')
    Adopter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='adoptions')
    AdoptionDate = models.DateField(auto_now_add=True)
    Status = models.CharField(max_length=20, default="pending")

# ------------------------
# Veterinarian
# ------------------------
class Veterinarian(models.Model):
    Name = models.CharField(max_length=100, default="unknown")
    Specialization = models.CharField(max_length=100, default="general")
    Contact = models.CharField(max_length=50, default="unknown")

    def __str__(self):
        return self.Name

# ------------------------
# VetAppointment
# ------------------------
class VetAppointment(models.Model):
    Pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='vet_appointments')
    Vet = models.ForeignKey(Veterinarian, on_delete=models.CASCADE, related_name='appointments')
    AppointmentDate = models.DateField(auto_now_add=True)
    Reason = models.CharField(max_length=200, default="Checkup")
    Notes = models.TextField(default="")

# ------------------------
# MedicalRecord
# ------------------------
class MedicalRecord(models.Model):
    Pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='medical_records')
    Vaccine = models.CharField(max_length=100, default="unknown")
    Treatment = models.CharField(max_length=200, default="unknown")
    RecordDate = models.DateField(auto_now_add=True)

# ------------------------
# Donation
# ------------------------
class Donation(models.Model):
    Shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='donations')
    User = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    Amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    DonationDate = models.DateField(auto_now_add=True)