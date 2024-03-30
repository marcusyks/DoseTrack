from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
from ..models import Plan
from ..models import Medicine

class MedicineSerializer(ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'medicineName', 'noOfPills','time']

class PlanSerializer(ModelSerializer):
    medicineNames = MedicineSerializer(many=True)

    class Meta:
        model = Plan
        fields = ['id', 'medicineNames', 'frequency', 'userID', 'modeOfContact', 'planName', 'telegramHandle', 'activated']

    def create(self, validated_data):
        # Extract medicineNames data from validated_data
        print(validated_data)
        medicine_data = validated_data.pop('medicineNames')

        medicine_list = []
        for medicine_data_item in medicine_data:
            medicine_name = medicine_data_item.get('medicineName')
            medicine_noOfPills = medicine_data_item.get('noOfPills')
            medicine_time = medicine_data_item.get('time')
            medicine_instance, _ = Medicine.objects.get_or_create(medicineName=medicine_name, noOfPills=medicine_noOfPills, time=medicine_time)
            medicine_list.append(medicine_instance)

        # Create the Plan instance with necessary fields
        plan_instance = Plan.objects.create(
            frequency=validated_data['frequency'],
            userID=validated_data['userID'],
            modeOfContact=validated_data['modeOfContact'],
            planName=validated_data['planName'],
            telegramHandle=validated_data['telegramHandle']
            # Add other necessary fields as needed
        )
        plan_instance.medicineNames.set(medicine_list)
        return plan_instance

    def update(self, instance, validated_data):
        # Extract medicineNames data from validated_data
        medicine_data = validated_data.pop('medicineNames')
        medicine_list = []

        for medicine_data_item in medicine_data:
            medicine_name = medicine_data_item.get('medicineName')
            medicine_noOfPills = medicine_data_item.get('noOfPills')
            medicine_time = medicine_data_item.get('time')
            medicine_instance, _ = Medicine.objects.get_or_create(medicineName=medicine_name, noOfPills=medicine_noOfPills, time=medicine_time)
            medicine_list.append(medicine_instance)

        # Update the existing Plan instance with necessary fields
        instance.frequency = validated_data['frequency']
        instance.userID = validated_data['userID']
        instance.modeOfContact = validated_data['modeOfContact']
        if instance.telegramHandle == "":
            instance.telegramHandle=validated_data['telegramHandle']
        if instance.activated == None:
            instance.activated=validated_data['activated']
        # Update other necessary fields as needed

        # Save the updated Plan instance
        instance.save()

        # Set the associated Medicine instances
        instance.medicineNames.set(medicine_list)

        return instance

class MedicineSerializer(ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'medicineName', 'noOfPills','time']
