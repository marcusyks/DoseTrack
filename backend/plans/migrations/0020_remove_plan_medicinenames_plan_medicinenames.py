# Generated by Django 4.2.10 on 2024-03-13 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0019_alter_plan_medicinenames'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plan',
            name='medicineNames',
        ),
        migrations.AddField(
            model_name='plan',
            name='medicineNames',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='plans.medicine'),
        ),
    ]
