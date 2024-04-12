from django.contrib import admin
from .models import Plan, Medicine, User
# Register your models here.

admin.site.register(Plan)
admin.site.register(Medicine)
admin.site.register(User)