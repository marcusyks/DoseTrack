# Generated by Django 4.2.10 on 2024-03-14 09:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0025_medicine_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicine',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]