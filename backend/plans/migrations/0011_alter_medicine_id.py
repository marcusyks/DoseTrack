# Generated by Django 4.2.10 on 2024-03-09 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0010_alter_plan_medicinenames'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
