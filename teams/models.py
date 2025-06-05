from django.db import models

class Team(models.Model):
    name = models.CharField(max_length = 100, unique = True)
    coach_name = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    league = models.ForeignKey('League', on_delete=models.SET_NULL, null=True, blank=True, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Player(models.Model):
    team = models.ForeignKey('Team', on_delete=models.CASCADE, related_name='players')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    position = models.CharField(max_length=30)
    number = models.PositiveIntegerField()
    age = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.team.name})"
    
    
class Match(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    match_date = models.DateTimeField()
    location = models.CharField(max_length=100)
    home_score = models.IntegerField(default=0)
    away_score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.home_team.name} vs {self.away_team.name} @ {self.location}"
    

class PlayerMatchStats(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='player_stats')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='match_stats')
    
    points = models.PositiveIntegerField(default=0)
    blocks = models.PositiveIntegerField(default=0)
    aces = models.PositiveIntegerField(default=0)
    errors = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.player.first_name} {self.player.last_name} in {self.match}"
    

class League(models.Model):
    name = models.CharField(max_length=100, unique=True)
    country = models.CharField(max_length=100, blank=True)
    level = models.CharField(max_length=50, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name