from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, PlayerViewSet, MatchViewSet, LeagueViewSet, PlayerMatchStatsViewSet

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'leagues', LeagueViewSet)
router.register(r'stats', PlayerMatchStatsViewSet)

urlpatterns = router.urls