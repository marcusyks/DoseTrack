from django.contrib import admin
from .models import Plan
from .models import Medicine
# Register your models here.

admin.site.register(Plan)
admin.site.register(Medicine)