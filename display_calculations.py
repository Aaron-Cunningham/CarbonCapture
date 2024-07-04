from models import User, db, Journey
from sqlalchemy import func
from datetime import datetime

def least_eco_friendly_result(inputID):
    """Get the least eco-friendly journey's emission.

    Parameters:
        inputID: Integer
    
    Returns float value rounded to two decimal places.

    If the user has no journeys, this function returns 0.
    
    Author: Igor Palka"""
        # Order by method in below query reverses the order,
        # so that first() is the highest emissions.
    score = Journey.query.filter_by(userID=inputID).order_by(
        Journey.emissions.desc()).first() 
    if score:
        return round(score.get_emissions(), 2)
    else: 
        return 0

def most_eco_friendly_result(inputID):
    """Get the most eco-friendly journey's emission.

    Parameters:
        inputID: Integer
    
    Returns float value rounded to two decimal places.

    If the user has no journeys, this function returns 0.
    
    Author: Igor Palka"""
        # Order by method is used to sort out the lowest emissions.
    score = Journey.query.filter_by(userID=inputID).order_by(
        Journey.emissions).first()
    if score:
        return round(score.get_emissions(), 2)
    else: 
        return 0

def total_consumption_result(inputID):
    """Get the total emissions for the id of a user. 

    Parameter:
        inputID: Integer
        
    The return value is a float value with two decimal spaces,
      or 0 if the id does not have any journeys.
    
    Author: Igor Palka"""
    score = 0
    # Get all journeys for user with inputID
    for journey in Journey.query.filter_by(userID=inputID).all():
        score += journey.get_emissions()
    return round(score, 2)

def total_mode_of_transport_emissions(inputID):
    """Get the total emissions for each form of transport for a user
    via their id.

    Parameters:
        inputID: Integer

    This returns a float array of five elements. Their position represent
    the following:
        - 0: Car
        - 1: Bus
        - 2: Train
        - 3: Motorbike
        - 4: Aeroplane
        
    Author: Igor Palka"""
    modes = [0,0,0,0,0] # Each position in the array corresponds to a mode of
                        # transport, 0: Car, 1: Bus, 2: Train, 3: Motorbike
                        # 4: Aeroplane, 5: Ferry.
    # Get all journeys for user with inputID
    for journey in Journey.query.filter_by(userID=inputID).all():
        transMethod = journey.get_trans_method()
        match transMethod:
            case "Car":
                modes[0] += journey.get_emissions()
            case "Flight":
                modes[1] += journey.get_emissions()
            case "Train":
                modes[2] += journey.get_emissions()
            case "Motorbike":
                modes[3] += journey.get_emissions()
            case "Bus":
                modes[4] += journey.get_emissions()
    return modes

def total_emissions_by_month(inputID):
    """Get the total emissions for each month for a specific user via their
    id.

    Parameters:
        inputID: Integer
    
    This returns a float array of twelve elements, where position 0 represents
    January, and position 11 represents December.
    
    Author: Igor Palka"""
        # Each position in the months array corresponds to a month
        # months[0] = January
        # months[11] = December.
    months = [0,0,0,0,0,0,0,0,0,0,0,0]
    current_year = datetime.now().year # Get the current year

     # Check for all journeys that belong to the inputID and is in this year.
    for journey in Journey.query.filter_by(userID = inputID).filter(
        func.extract("year",Journey.startDate) == current_year).all(): 
        
        
        journey_month = journey.get_month() # Get month (int) from datetime.
        months[journey_month-1]+= journey.get_emissions()
    return months

def calc_total_emissions(inputID):
    """Set the total emissions for user with id inputID in the database.

    Parameters:
        inputID: Integer
    
    This function does not return a value - it instead changes the total
    emissions of a user in the database.
    
    Author: Igor Palka"""
    year = datetime.now().year
    month = datetime.now().month
    # Get the user via inputID in the database.
    user = User.query.filter_by(id=inputID).first()

    total_emissions = 0
    # Get all journeys belonging to the inputID
    journeys = Journey.query.filter_by(userID=inputID).filter(
        func.extract("month",Journey.startDate) == month,
        func.extract("year",Journey.startDate) == year).all()
    
    for journey in journeys:
        total_emissions += journey.get_emissions()
    user.set_total_emission(total_emissions)

def calc_all_total_emissions():
    """Set the total emissions for all users for this month.

    Returns void.

    Author: Igor Palka"""
    year = datetime.now().year
    month = datetime.now().month
    # Create list of all users in database.
    users = User.query.all()
    for user in users:
        total_emissions = 0
        # Get all journeys belonging to the user
        journeys = Journey.query.filter_by(userID=user.id).filter(
        func.extract("month",Journey.startDate) == month,
        func.extract("year",Journey.startDate) == year).all()

        for journey in journeys:
            total_emissions += journey.get_emissions()
        user.set_total_emission(total_emissions)

def leaderboard(length):
    """Gets the current total emissions for their users and formats it as an
    array of dictionary objects, where each dictionary holds the ranking,
    name, and total emissions.

    This function returns an array of dictionaries, where the size of the
    array is limited by the length parameter.

    Parameters:
        length: Integer

    Returns list up to length
    
    Author: Igor Palka"""
    data = []
    curr_pos = 0
    # Query all users by total emissions, excluding the banned
    users = User.query.filter_by(banned=False).order_by(
        User.totalEmissions).all()
    for result in users:
        if result.get_total_emission() > 0 and len(data) <= length:
            name = (result.firstName+" "+result.lastName)
            data.insert(curr_pos,dict(rank = curr_pos+1,fullName=name,
                                    co2Consumption=round(
                                    result.get_total_emission(),2)))
            curr_pos += 1
    return data

def admin_user_rate():
    """Return an integer array, where each position represents the number
      of users that signed up to the database. Returns 0 on months without
      any signups, including future months.
      
    Author: Igor Palka, Aaron Cunningham"""
    months = [0,0,0,0,0,0,0,0,0,0,0,0]
    current_year = datetime.now().year # Get the current year
    # Query from total_emissions_by_month
    all_user_list = User.query.filter(
                    func.extract("year",User.signUpDate) == current_year,
                                         User.role=="User").all()
    for user in all_user_list:
        user_sign_up_date = user.get_signup()
        months[user_sign_up_date-1] += 1
    return months
