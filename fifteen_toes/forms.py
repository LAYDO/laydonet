from django import forms

class CreateLobbyForm(forms.Form):
    CHOICES = [
        ('Public','Public'),
        ('Private','Private'),
    ]
    privacy = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=CHOICES,
    )
    lobby_password = forms.CharField(max_length=20)

class JoinLobbyForm(forms.Form):
    CHOICES = [
        ('Random Lobby', 'Random Lobby'),
        ('Lobby Number', 'Lobby Number'),
    ]
    option = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=CHOICES,
    )
    lobby_number = forms.CharField(max_length=10)