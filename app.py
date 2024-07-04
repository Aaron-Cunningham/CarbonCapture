# IMPORTS
import os
import logging
from flask import Flask, render_template, request
from dotenv import load_dotenv
from flask_login import LoginManager
from display_calculations import leaderboard, calc_all_total_emissions
from models import db
from datetime import date
import calendar

load_dotenv()

# CONFIG
app = Flask(__name__)

app.config['APP_KEY'] = os.getenv('GOOGLE_API_KEY')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_ECHO'] = True
app.config["SQLALCHEMY_RECORD_QUERIES"] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['RECAPTCHA_PUBLIC_KEY'] = os.getenv('RECAPTCHA_PUBLIC_KEY')
app.config['RECAPTCHA_PRIVATE_KEY'] = os.getenv('RECAPTCHA_PRIVATE_KEY')

# initialise database
db.init_app(app)

# HOME PAGE VIEW
@app.route('/')
def index():
    """
    This function is for the home page view including the leaderboard creation

    Author of this function: Lauren Harbige and Aaron Cunningham
    """
    todays_date = date.today()
    month = calendar.month_name[todays_date.month]
    year = todays_date.year
    calc_all_total_emissions()
    db.session.commit()
    data = leaderboard(100)
    page = request.args.get('page', 1, type=int)
    per_page = 10
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = data[start:end]
    

    total_pages = (len(data) + per_page - 1) // per_page

    return render_template('main/index.html', people=paginated_data, page=page, total_pages=total_pages, year=year, month=month)

# ERROR PAGES
@app.errorhandler(400)
def function_name(error):
    return render_template('errors/400.html'), 400
@app.errorhandler(403)
def function_name(error):
    return render_template('errors/403.html'), 403
@app.errorhandler(404)
def function_name(error):
    return render_template('errors/404.html'), 404
@app.errorhandler(500)
def function_name(error):
    return render_template('errors/500.html'), 500
@app.errorhandler(502)
def function_name(error):
    return render_template('errors/502.html'), 502

class SecurityFilter(logging.Filter):
    """
    This class and code below creates the logger

    Author of this function: Lauren Harbige
    """
    def filter(self, record):
        return 'SECURITY' in record.getMessage()


# creating a logger
logger = logging.getLogger()
file_handler = logging.FileHandler('security.log', 'a')
# sets a warning indicating something unexpected happened
file_handler.setLevel(logging.WARNING)
file_handler.addFilter(SecurityFilter())
formatting = logging.Formatter('%(asctime)s : %(message)s', '%m/%d/%Y %I:%M:%S %p')
file_handler.setFormatter(formatting)
logger.addHandler(file_handler)


# BLUEPRINTS
# import blueprints
from users.views import users_blueprint
from calculator.views import calculator_blueprint
from admin.views import admin_blueprint
#
# registers blueprints with app
app.register_blueprint(users_blueprint)
app.register_blueprint(calculator_blueprint)
app.register_blueprint(admin_blueprint)

# Login manager
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.init_app(app)


# Searches database for a user with same ID
@login_manager.user_loader
def load_user(id):
    from models import User
    return User.query.get(int(id))


if __name__ == "__main__":
    app.run(debug=True)