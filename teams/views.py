from django.shortcuts import render
from rest_framework import viewsets

from .models import Team
from .serializers import TeamSerializer

from .models import Player
from .serializers import PlayerSerializer

from .models import Match
from .serializers import MatchSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer