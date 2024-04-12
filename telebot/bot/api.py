import requests

def get_users(api_address):
    response = requests.get(api_address)
    if response.status_code == 200:
        plans = response.json()
        return plans
    else:
        # Handle error
        print("Error fetching data:", response.status_code)
        return None

# Create user
def create_user(users, username, api_address):
    for user in users:
        user_name = user.get('telegramHandle')
        if user_name == username:
            print(f'{username} already exists')
            return
    data = {'telegramHandle': username}
    try:
        response = requests.post(api_address, data)
    except:
        print("Error fetching data:", response.status_code)


# Fetch all plans based on username

def fetch_all_plans_username(telegramHandle, api_address):
    response = requests.get(api_address)
    if response.status_code == 200:
        plans = response.json()
        # Filter data
        matching_plans = []
        for plan in plans: #Get plans that match telehandle and are of activation condition
            if plan.get('telegramHandle') == telegramHandle:
                matching_plans.append(plan)
        print(f'Matched Plans - {matching_plans}')
        return matching_plans
    else:
        # Handle error
        print("Error fetching data:", response.status_code)
        return None

# Fetch plans based on activation condition

def fetch_data_from_plans(telegramHandle,activation,api_address):
    response = requests.get(api_address)
    if response.status_code == 200:
        plans = response.json()
        # Filter data
        matching_plans = []
        for plan in plans: #Get plans that match telehandle and are of activation condition
            if plan.get('telegramHandle') == telegramHandle and plan.get('activated') == activation:
                matching_plans.append(plan)
        print(f'Matched Plans - {matching_plans}')
        return matching_plans
    else:
        # Handle error
        print("Error fetching data:", response.status_code)
        return None


# Update plans based on activation condition

def update_plans(plans, activation, api_address):
    print(f'Before Update : {plans}')
    for plan in plans:
        plan_id = plan.get('id')
        plan_url = api_address+f'{plan_id}/'
        plan['activated'] = activation
        response = requests.put(plan_url, json=plan)
        if response.status_code == 200:
            pass
        else:
            # Handle error
            print("Error updating data:", response.status_code)
            return None
    print(f'After Update : {plans}')

def medicineFormatter(medicines):
    resultString = ""
    for medicine in medicines:
        name = medicine.get('medicineName')
        quantity = medicine.get('noOfPills')
        time = medicine.get('time')

        template = f'\n\t\t\t\t\t\t\t{name}, {quantity}, ⌚{time}'

        resultString+=template

    return resultString

def dateFormatter(frequency):
    week = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    resultString = ""

    dates = list(str(frequency))
    for day in dates:
        day_of_week = week[int(day) - 1]
        template = f"\n\t\t\t\t\t\t\t{day_of_week}"
        resultString+=template

    return resultString

def plansFormatter(plans, activation: str):
    resultString = f"Here are your {activation} plans:\n\n"

    for plan in plans:
        planName = plan.get('planName')
        medicineNames = plan.get('medicineNames')
        frequency = plan.get('frequency')
        activated = plan.get('activated')

        template = f'''\t⭐ Plan Name:  {planName}\n\t💊 Medicines:  {medicineFormatter(medicineNames)}\n\t📅 Frequency:  {dateFormatter(frequency)}\n\t✅ Activated: {activated}\n\n\n'''
        resultString += template

    return resultString