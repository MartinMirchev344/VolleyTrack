from django.shortcuts import render
from rest_framework import viewsets

from .models import Team
from .serializers import TeamSerializer
from django_filters.rest_framework import DjangoFilterBackend

from .models import Player
from .serializers import PlayerSerializer

from .models import Match
from .serializers import MatchSerializer

from .models import League
from .serializers import LeagueSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['league']


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer


class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer