from django.db import models

# Create your models here.

class BookAppointment(models.Model):
    name=models.CharField(max_length=60)
    email=models.EmailField(unique=True)
    phone=models.IntegerField()
    date=models.DateTimeField()
    approved=models.BooleanField(default=False)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['date'],
                name='unique_appointment_time'
            )
        ]