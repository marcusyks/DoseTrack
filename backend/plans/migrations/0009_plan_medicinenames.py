# Generated by Django 4.2.10 on 2024-03-09 07:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0008_alter_medicine_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='medicineNames',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='plans.medicine'),
        ),
    ]
