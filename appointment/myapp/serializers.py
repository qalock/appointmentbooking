from rest_framework import serializers
from .models import BookAppointment
from django.utils import timezone


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model=BookAppointment
        fields='__all__'


    def validate_date(self, value):

        
        if value < timezone.now():
            raise serializers.ValidationError("Cannot book past date/time.")

        if BookAppointment.objects.filter(date=value).exists():
            raise serializers.ValidationError("This slot is already booked.")

        return value