from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BookSerializer
from .models import BookAppointment
from django.utils import timezone

# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    queryset=BookAppointment.objects.all()
    serializer_class=BookSerializer

    def get_queryset(self):
        return BookAppointment.objects.filter(date__gte=timezone.now())