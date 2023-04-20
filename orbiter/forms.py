from django import forms
from .models import Satellite

class SatelliteForm(forms.ModelForm):
    class Meta:
        model = Satellite
        fields = ('name', 'tle_line1', 'tle_line2')