from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class RegistrationAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                data={
                    'error':'Username and Password are required fields'
                },
                    status=status.HTTP_400_BAD_REQUEST
            )

        existing_user = User.objects.filter(username=username).first()
        if existing_user:
            return Response(
                data={
                    'error':'Username is already in use'
                },
                status=status.HTTP_409_CONFLICT
            )
        
        new_user = User.objects.create_user(username=username, password=password)
        return Response(
            data={
                'message': f'User {new_user.username} created successfully'
            },
            status=status.HTTP_201_CREATED
        )
    
class LoginAPIview(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            return Response(
                data={
                    'error':'Invalid username or password'
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response(data={
            'token':token.key
        })