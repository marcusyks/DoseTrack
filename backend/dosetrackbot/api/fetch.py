<<<<<<< HEAD
import requests
import environ
env = environ.Env()
environ.Env.read_env()


def fetch_data_from_plans(telegramHandle,activation):
    url = env('API_ADDRESS')  # Fetch all plans
    response = requests.get(url)
    if response.status_code == 200:
        plans = response.json()
        # Filter data
        matching_plans = []
        for plan in plans: #Get plans that match telehandle and are of activation condition
            if plan.get('telegramHandle') == telegramHandle and plan.get('activated') == activation:
                matching_plans.append(plan)
        return matching_plans
    else:
        # Handle error
        print("Error fetching data:", response.status_code)
        return None

def update_plans(plans, activation):
    for plan in plans:
        plan_id = plan.get('id')
        plan_url = env('API_ADDRESS')+f'{plan_id}/'
        plan['activated'] = activation
        response = requests.put(plan_url, json=plan)
        if response.status_code == 200:
            pass
        else:
            # Handle error
            print("Error updating data:", response.status_code)
            return None

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

        template = f'''\t⭐ Plan Name:  {planName}\n\t💊 Medicines:  {medicineFormatter(medicineNames)}\n\t📅 Frequency:  {dateFormatter(frequency)}\n\n\n'''
        resultString += template

    return resultString


=======
import requests
import environ
env = environ.Env()
environ.Env.read_env()


def fetch_data_from_plans(telegramHandle, activation):
    url = env('API_ADDRESS')  # Fetch all plans
    session = requests.Session()
    login_url = env('API_LOGIN') # Your login endpoint
    session.post(login_url, data={'username': env('API_USERNAME'), 'password': env('API_PASSWORD')})  # Login to obtain session cookie
    response = session.get(url)
    if response.status_code == 200:
        plans = response.json()
        # Filter data
        matching_plans = []
        for plan in plans: #Get plans that match telehandle and are of activation condition
            if plan.get('telegramHandle') == telegramHandle and plan.get('activated') == activation:
                matching_plans.append(plan)
        # Logout after fetching data
        logout_url = env('API_LOGOUT')  # Your logout endpoint
        session.get(logout_url)
        return matching_plans
    else:
        # Handle error
        print("Error fetching data:", response.status_code)
        return None

def update_plans(plans, activation):
    session = requests.Session()
    login_url = env('API_LOGIN') # Your login endpoint
    session.post(login_url, data={'username': env('API_USERNAME'), 'password': env('API_PASSWORD')})  # Login to obtain session cookie
    for plan in plans:
        plan_id = plan.get('id')
        plan_url = f"{env('API_ADDRESS')}/{plan_id}/"
        plan['activated'] = activation
        response = session.put(plan_url, json=plan)
        if response.status_code == 200:
            pass
        else:
            # Handle error
            print("Error updating data:", response.status_code)
            return None
    # Logout after fetching data
    logout_url = env('API_LOGOUT')  # Your logout endpoint
    session.get(logout_url)

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

        template = f'''\t⭐ Plan Name:  {planName}\n\t💊 Medicines:  {medicineFormatter(medicineNames)}\n\t📅 Frequency:  {dateFormatter(frequency)}\n\n\n'''
        resultString += template

    return resultString


>>>>>>> 48735e8 (MVP)
