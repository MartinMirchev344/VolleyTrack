from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Team, Player, Match, PlayerMatchStats, League
from .serializers import TeamSerializer, PlayerSerializer, MatchSerializer, PlayerMatchStatsSerializer, LeagueSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['league', 'city']
    search_fields = ['name']
    ordering_fields = ['name']

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Team created successfully.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            "message": "Team updated successfully.",
            "data": response.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({
            "message": "Team deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['team', 'position', 'age']
    search_fields = ['first_name', 'last_name']
    ordering_fields = ['age', 'number']

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Player created successfully.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            "message": "Player updated successfully.",
            "data": response.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({
            "message": "Player deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['home_team', 'away_team', 'match_date']
    ordering_fields = ['match_date']

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Match created successfully.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            "message": "Match updated successfully.",
            "data": response.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({
            "message": "Match deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)


class PlayerMatchStatsViewSet(viewsets.ModelViewSet):
    queryset = PlayerMatchStats.objects.all()
    serializer_class = PlayerMatchStatsSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Player stats recorded.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            "message": "Player stats updated.",
            "data": response.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({
            "message": "Player stats deleted."
        }, status=status.HTTP_204_NO_CONTENT)


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

        return Response({
            "league": league.name,
            "status": status.HTTP_200_OK,
            "standings": standings
        }, status=status.HTTP_200_OK)