# Generated by Django 4.2.11 on 2024-03-09 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0007_medicine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
