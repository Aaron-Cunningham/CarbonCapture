from flask import Blueprint, render_template, request, jsonify
from dotenv import load_dotenv
import os
import logging
from models import Journey, db
from flask_login import current_user
from datetime import datetime
from display_calculations import calc_total_emissions
from flask_login import login_required
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")


calculator_blueprint = Blueprint('calculator', __name__, template_folder='templates')
# Gets the data from the javascript code adapted from [https://www.geeksforgeeks.org/pass-javascript-variables-to-python-in-flask/]
@calculator_blueprint.route('/process', methods=['POST'])
def process():
    """
    Author of this function: Aaron Cunningham
    """
    
    data = request.json # Retrieves the data from the JavaScript backend
    try:
        tripType = data.get('tripType')
        fuelType = data.get('fuelType')
        distance = data.get('distance')
        co2 = data.get('co2')
        transportMethod = data.get('selectedMode')
        new_journey = Journey(userID=current_user.id, startDate=datetime.today(), transportMethod=transportMethod, length=distance, roundTrip=tripType, fuel=fuelType, emissions=co2) #Adds a new journey to the journey table
        db.session.add(new_journey) # Commits the journey
        calc_total_emissions(current_user.id)
        db.session.commit()
        logging.warning(f"SECURITY - %s Journey uploaded [%s, %s]",  # Logs that a new journey has been added
                        transportMethod,
                        current_user.email,
                        request.remote_addr,
                        )
        # Code adapted from [https://www.fullstackpython.com/flask-json-jsonify-examples.html]
        return jsonify(message="Journey addition was a success",
                       status=200,
                       category="success"
                       )
    #Code Referenced from  https://stackoverflow.com/questions/61632444/jsonify-exception-errors
    except ValueError as error:
        return {
            'message': "Bad request!",
            'status': 400,
            'Error': str(error),
        }, 400
    except:
        return {
            'message': "Bad request!",
            'status': 400,
            'Error': 'Unexpected error.',
        }, 400



@calculator_blueprint.route('/calculator/car', methods=['GET', 'POST'])
@login_required
def car():
    return render_template('calculator/car.html', API_KEY=API_KEY)

@calculator_blueprint.route('/calculator/train', methods=['GET', 'POST'])
@login_required
def train():
    return render_template('calculator/train.html', API_KEY=API_KEY)

@calculator_blueprint.route('/calculator/bus', methods=['GET', 'POST'])
@login_required
def bus():
    return render_template('calculator/bus.html', API_KEY = API_KEY)

@calculator_blueprint.route('/calculator/flight', methods=['GET', 'POST'])
@login_required
def plane():
    return render_template('calculator/plane.html', API_KEY=API_KEY)

@calculator_blueprint.route('/calculator/motorbike', methods=['GET', 'POST'])
@login_required
def motorbike():
    return render_template('calculator/motorbike.html', API_KEY=API_KEY)





