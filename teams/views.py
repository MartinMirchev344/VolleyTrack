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
from rest_framework.decorators import action
from rest_framework.response import Response

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

    @action(detail=True, methods=['get'])
    def standings(self, request, pk=None):
        league = self.get_object()
        teams = league.teams.all()

        standings = []

        for team in teams:
            home_matches = Match.objects.filter(home_team=team)
            away_matches = Match.objects.filter(away_team=team)
            all_matches = home_matches.union(away_matches)

            wins = 0
            losses = 0
            played = 0

            for match in all_matches:
                if match.home_score == 0 and match.away_score == 0:
                    continue
                played += 1
                if (match.home_team == team and match.home_score > match.away_score) or \
                   (match.away_team == team and match.away_score > match.home_score):
                    wins += 1
                else:
                    losses += 1

            standings.append({
                "team": team.name,
                "matches_played": played,
                "wins": wins,
                "losses": losses,
                "points": wins * 3
            })

        standings.sort(key=lambda x: x['points'], reverse=True)

        return Response(standings)