# Generated by Django 4.2.11 on 2024-03-21 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0028_remove_plan_telegramhandle_delete_validuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='telegramHandle',
            field=models.CharField(default='', max_length=100),
        ),
    ]
