# Generated by Django 4.2.10 on 2024-03-09 08:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0013_alter_medicine_medicinename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='medicineName',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='plan',
            name='medicineNames',
            field=models.ForeignKey(blank='True', on_delete=django.db.models.deletion.CASCADE, to='plans.medicine'),
        ),
    ]
