# Generated by Django 4.2.10 on 2024-03-14 07:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0023_alter_planmedicinerelationship_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='date_created',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
