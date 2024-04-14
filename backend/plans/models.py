from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

class User(models.Model):
    id = models.AutoField(primary_key=True)
    telegramHandle = models.CharField(max_length = 100, default = "")

    def __str__(self):
        return f'Username: {self.telegramHandle}'

class Medicine(models.Model):
    id = models.AutoField(primary_key=True)
    medicineName = models.TextField()
    noOfPills = models.IntegerField(default=0)
    time = models.TimeField(default=timezone.now)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.medicineName

class Plan(models.Model):
    id = models.AutoField(primary_key=True)
    medicineNames = models.ManyToManyField(Medicine, through="PlanMedicineRelationship")
    frequency = models.IntegerField()
    modeOfContact = models.TextField()
    userID = models.TextField()
    planName = models.TextField(default="")
    date_created = models.DateField(default=timezone.now)
    telegramHandle = models.CharField(max_length = 100, default = "")
    activated = models.BooleanField(default=False)

    def __str__(self):
        return f"Plan ID: {self.id}"

    def delete(self, *args, **kwargs):
        # Print the associated Medicine instances before deletion
        print("Associated Medicine instances:", self.medicineNames.all())

        # Delete associated Medicine instances
        self.medicineNames.all().delete()

        # Call the superclass delete method to delete the Plan instance
        super().delete(*args, **kwargs)

class PlanMedicineRelationship(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('plan', 'medicine')