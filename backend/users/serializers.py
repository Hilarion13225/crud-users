from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    def update(self, instance, validated_data):
        # Si pas de nouvelle image envoyée, garder l'ancienne
        if 'image' not in validated_data:
            validated_data['image'] = instance.image
        return super().update(instance, validated_data)