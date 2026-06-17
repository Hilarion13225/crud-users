from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        mot_de_passe = request.data.get('mot_de_passe')

        try:
            user = User.objects.get(email=email, mot_de_passe=mot_de_passe)
        except User.DoesNotExist:
            return Response(
                {'error': 'Email ou mot de passe incorrect'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Générer les tokens JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'nom': user.nom,
                'email': user.email,
                'role': user.role,
                'image': user.image.url if user.image else None,
            }
        })