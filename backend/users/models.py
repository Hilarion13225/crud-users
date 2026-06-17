from django.db import models

# Create your models here.
class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Administrateur'),
        ('client', 'Client'),
        ('utilisateur', 'Utilisateur'),
    ]
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mot_de_passe = models.CharField(max_length=255)
    image = models.ImageField(
        upload_to='users/',
        blank=True,
        null=True
    )
    cree_le = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nom} ({self.role})"