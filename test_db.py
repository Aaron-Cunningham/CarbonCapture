import pytest
from models import  User, Journey
from datetime import datetime
from app import db,app
import os
import bcrypt

def setup_single_user():
    """This function is used to create a single user for testing

    Returns a user object.

    Author: Igor Palka"""
    user1 = User("Igor","Palka","coolguy@gmail.com","User","coolpasswordneverhacked123","07541321329")
    return user1

def setup_journey_single():
    """This function is used to setup a single journey for testing

    Returns a journey object.

    Author: Igor Palka"""
    journey = Journey(datetime.now(),2,"Car",1.21,"Round Trip","diesel",13)
    return journey

def setup_journey_this_month():
    """This function is used to create multiple journeys in the current month to 
    test the 'test_calc_total_emissions' function.

    Returns a list of journey objects.
    
    Author: James Whitley"""
    journey = []
    journey.append(Journey(datetime.now(),3,"Car",1.21,"Round Trip","diesel",13))
    journey.append(Journey(datetime.now(),3,"Bus",36,"One Way","Coach",78))
    journey.append(Journey(datetime.now(),3,"Car",4,"Round Trip","diesel",43))
    return journey

def setup_journey_multiple(): 
    """This function is used to create multiple journeys for testing
    
    Returns a list of journey objects.

    Author: James Whitley"""
    journey = []
    journey.append(Journey(datetime(2024,3,1),2,"Car",1.21,"Round Trip","diesel",13))
    journey.append(Journey(datetime(2024,4,12),2,"Bus",36,"One Way","",78))
    journey.append(Journey(datetime(2024,12,16),2,"Car",4,"Round Trip","diesel",43))
    journey.append(Journey(datetime(2024,7,7),2,"Train",113,"Round Trip","diesel",121))
    journey.append(Journey(datetime(2024,9,18),2,"Motorbike",5.3,"Round Trip","diesel",23))
    journey.append(Journey(datetime(2024,1,28),2,"Flight",1267,"One Way","Premium Class",1695))
    journey.append(Journey(datetime(2024,7,12),2,"Car",53.2,"Round Trip","diesel",345))
    journey.append(Journey(datetime(2024,4,24),2,"Train",117,"Round Trip","diesel",456))
    journey.append(Journey(datetime(2024,11,16),2,"Car",7.6,"Round Trip","diesel",89))
    journey.append(Journey(datetime(2024,6,20),2,"Motorbike",10.8,"One Way","",124))
    journey.append(Journey(datetime(2024,2,28),2,"Flight",834,"Round Trip","Premium Class",2978))
    journey.append(Journey(datetime(2024,8,30),2,"Motorbike",2.3,"Round Trip","diesel",12))
    journey.append(Journey(datetime(2024,2,28),3,"Flight",834,"Round Trip","Premium Class",9811))
    journey.append(Journey(datetime(2024,2,28),4,"Flight",834,"Round Trip","Premium Class",4211))
    journey.append(Journey(datetime(2024,2,28),3,"Car",13,"Round Trip","diesel",21))
    journey.append(Journey(datetime(2024,2,28),4,"Car",14,"Round Trip","diesel",24))
    journey.append(Journey(datetime(2024,2,28),1,"Flight",834,"Round Trip","Premium Class",7867))
    return journey

def test_user_has_no_id():
    """This test checks that the user does not have an id - this should be
    instead allocated within the database instead.

    The assertion checks that the id is not present.
    
    Author: Igor Palka"""
    assert setup_single_user().id == None

def test_user_has_allocated_attributes():
    """This test checks that the instance created by the initialiser
    function has been successful.

    Each assertion compares a non-default variable that has been input
    into there.
    
    Author: Igor Palka"""
    user = setup_single_user()
    assert user.firstName == "Igor"
    assert user.lastName == "Palka"
    assert user.email == "coolguy@gmail.com"
    assert user.role == "User"
    assert bcrypt.checkpw("coolpasswordneverhacked123".encode('utf-8'),
                           user.password)
    assert user.phone == "07541321329"

def test_user_ban_status():
    """This test checks that the user is not banned upon instantiation.

    Asserts that the banned variable is False.

    Author: Igor Palka"""
    assert setup_single_user().banned == False

def test_user_is_banned():
    """This test checks that the 'ban_user' function correctly changes the 
    status of a user to 'banned'
    
    Author: Igor Palka"""
    user = setup_single_user()
    user.ban_user()
    assert user.banned == True

def test_user_password_is_changed():
    """This test checks if the a users password is correctly changed 
    within the database when the 'change_password' function is called
    
    Author: Igor Palka"""

    with app.app_context():
        user = setup_single_user()
        db.session.add(user)
        userBefore = db.session.query(User).filter_by(email ="coolguy@gmail.com").first()
        assert bcrypt.checkpw("coolpasswordneverhacked123".encode('utf-8'), userBefore.password)
        userBefore.change_password("mypasswordgothackedN000")
        userAfter = db.session.query(User).filter_by(email ="coolguy@gmail.com").first()
        assert bcrypt.checkpw("mypasswordgothackedN000".encode('utf-8'), userAfter.password)
        db.session.rollback()

def test_add_user_to_database():
    """ This test checks if a user can be dirctly added to the mysql database.

    Author: James Whitley"""
    with app.app_context():
        testUser = setup_single_user()
        db.session.add(testUser)
        retrieved_user = db.session.query(User).filter_by(email="coolguy@gmail.com").first()
        assert retrieved_user.firstName == "Igor"
        assert retrieved_user.lastName == "Palka"
        assert retrieved_user.email == "coolguy@gmail.com"
        assert retrieved_user.role == "User"
        assert bcrypt.checkpw("coolpasswordneverhacked123".encode('utf-8'), retrieved_user.password)

        assert retrieved_user.phone == "07541321329"
        db.session.rollback()

def test_add_journey_to_database():
    """This test checks if a journey can be dirctly added to the mysql database.
    
    Author: James Whitley"""

    with app.app_context():
        testJourney = setup_journey_single()
        db.session.add(testJourney)
        retrievedJourney = db.session.query(Journey).filter_by(userID=2).first()
        assert retrievedJourney.length == 1.21
        assert retrievedJourney.roundTrip == "Round Trip"
        assert retrievedJourney.userID == 2
        assert retrievedJourney.fuel == "diesel"
        assert retrievedJourney.emissions == 13
        db.session.rollback()

def test_total_mode_of_transport_emissions():
    """This test checks if the 'total_mode_of_transport_emmisions' function  returns a correct 
    list of emissions values for each mode of transport a user has used.
    
    Author: James Whitley"""
    from display_calculations import total_mode_of_transport_emissions
    with app.app_context():
        journeys = setup_journey_multiple()
        for journey in journeys:
            db.session.add(journey)

        car,flight,train,motorbike,bus = total_mode_of_transport_emissions(2)
        assert car == 490
        assert flight == 4673
        assert train == 577
        assert motorbike == 159
        assert bus == 78
        db.session.rollback()

def test_total_consumption_result():
    """This test checks if the 'total_consumption_result' function calculates correct
    values for the total emmisions for 3 diffferent users
    
    Author: James Whitley"""
    from display_calculations import total_consumption_result
    with app.app_context():
        journeys = setup_journey_multiple()
        for journey in journeys:
            db.session.add(journey)

        user2Emissions = total_consumption_result(2)
        user3Emissions = total_consumption_result(3)
        user4Emissions = total_consumption_result(4)
        assert user2Emissions == 5977
        assert user3Emissions == 9832
        assert user4Emissions == 4235

def test_total_emissions_by_month():
    """This test checks if the 'total_emissions_by_month' function calculates a list of 
    correct values a user has in each month of the year
    
    Author: James Whitley"""
    from display_calculations import total_emissions_by_month
    with app.app_context():
        journeys = setup_journey_multiple()
        for journey in journeys:
            db.session.add(journey)

        jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec = total_emissions_by_month(2)
        assert jan ==1695
        assert feb ==2978
        assert mar ==13
        assert apr ==534
        assert may ==0
        assert jun ==124
        assert jul ==466
        assert aug ==12
        assert sep ==23
        assert oct ==0
        assert nov ==89
        assert dec ==43

def test_calc_total_emissions():
    """This test checks if the 'calc_total_emissions' function calculates
    and adds a users total emissions for this month to the database
    
    Author: James Whitley"""
    from display_calculations import calc_total_emissions
    with app.app_context():
        journeys = setup_journey_this_month()
        for journey in journeys:
            db.session.add(journey)

        calc_total_emissions(3)
        db.session.commit()
        user = db.session.query(User).filter_by(id=3).first()
        assert user.get_total_emission() == 134
        db.session.rollback()
        journeys = db.session.query(Journey).filter_by(userID=3)
        for journey in journeys:
            db.session.delete(journey)
        db.session.commit()

def test_leaderboard():
    """This test checks if the 'leaderboard' function calculates and returns an ordered list 
     of dictionaries containing the top 3 users with the lowest emissions this month
     
     Author: James Whitley"""
    from display_calculations import leaderboard
    with app.app_context():
        user1,user2,user3 = leaderboard(2)
        assert user1 == {'co2Consumption': 50.28, 'fullName': 'Jason Jones', 'rank': 1}
        assert user2 == {'co2Consumption': 51.0, 'fullName': 'Igor Palka', 'rank': 2}
        assert user3 == {'co2Consumption': 56.84, 'fullName': 'Sum Ting Wong', 'rank': 3}

def test_most_eco_friendly_result():
     """This test checks if the 'most_eco_friendly_result' function returns the journey 
     with the lowest emissions for 3 different users
     
     Author: James Whitley"""
     from display_calculations import most_eco_friendly_result
     with app.app_context():
        journeys = setup_journey_multiple()
        for journey in journeys:
            db.session.add(journey)

        user2MostFreindlyJourney = most_eco_friendly_result(2)
        user3MostFreindlyJourney = most_eco_friendly_result(3)
        user4MostFreindlyJourney = most_eco_friendly_result(4)
        assert user2MostFreindlyJourney == 12
        assert user3MostFreindlyJourney == 21
        assert user4MostFreindlyJourney == 24
        db.session.rollback()

def test_least_eco_friendly_result():
    """This test checks if the 'least_eco_friendly_result' function returns the 
    journey with the highest emissions for 3 different users
    
    Author: James Whitley"""
    from display_calculations import least_eco_friendly_result
    with app.app_context():
        journeys = setup_journey_multiple()
        for journey in journeys:
            db.session.add(journey)

        user2LeastFreindlyJourney = least_eco_friendly_result(2)
        user3LeastFreindlyJourney = least_eco_friendly_result(3)
        user4LeastFreindlyJourney = least_eco_friendly_result(4)
        assert user2LeastFreindlyJourney == 2978
        assert user3LeastFreindlyJourney == 9811
        assert user4LeastFreindlyJourney == 4211
        db.session.rollback()





