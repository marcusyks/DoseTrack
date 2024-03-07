from django.db import models

# Create your models here.
class Plan(models.Model):
    id = models.AutoField(primary_key=True)
    medicineName = models.CharField(max_length=200)
    noOfPills = models.IntegerField()
    frequency = models.IntegerField()
    modeOfContact = models.TextField() 
    userID = models.TextField()

    def __str__(self):
        return f"Plan ID: {self.id}"
