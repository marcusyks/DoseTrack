# Generated by Django 4.2.11 on 2024-03-09 06:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0005_plan_planname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plan',
            name='medicineName',
        ),
    ]
