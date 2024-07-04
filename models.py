from flask_login import UserMixin, current_user
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import bcrypt
from functools import wraps
from flask import render_template

# Create SQLAlchemy instance
db = SQLAlchemy()

class User(db.Model, UserMixin):
    """Class User.
    Variables:
        - id: Integer
        - firstName: String (length 30)
        - lastName: String (length 30)
        - email: String (length 30)
        - phone: String (length 30)
        - banned: BOOLEAN
        - role: String (length 10)
        - password: String (length 20)
        - signUpDate: Datetime
        - totalEmissions: Float

    Methods:
        - __init__(self,firstName,lastName,email,role,password)
        - ban_user(self)
        - change_password(self,newPassword)
        - check_password(self,password)
        - get_signup(self)
        - set_total_emission(self, total)
        - get_total_emission(self)

    Note: role variable should always start with a capital i.e. "Admin".
        
    Author: Igor Palka"""
    
    __tablename__ = 'users'
    # User information
    id = db.Column(db.Integer, primary_key=True, unique=True)
    firstName = db.Column(db.String(30), nullable=False)
    lastName = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False, unique=True)
    phone = db.Column(db.String(30), nullable=False, unique=True)
    banned = db.Column(db.BOOLEAN, nullable=False, default=False)
    role = db.Column(db.String(10), nullable=False, default="User") 
    password = db.Column(db.String(100), nullable=False)
    signUpDate = db.Column(db.DateTime,nullable=False,default=datetime.now())
    totalEmissions = db.Column(db.Float,nullable=False)
    
    journeys = db.relationship("Journey")
    def __init__(self,firstName,lastName,email,role,password, phone):
        """Initialising method. Note that this does not check the types.

            Takes five variables:
                firstName: String (length 30)
                lastName: String (length 30)
                email: String (length 30)
                role: String (length 10)
                password: String (length 30)

            Returns instance object of the User Class.
                
        Author: Igor Palka"""
        self.firstName=firstName
        self.lastName=lastName
        self.email=email
        self.role=role
        self.phone=phone
        self.password=bcrypt.hashpw(password.encode('utf-8'),
                                     bcrypt.gensalt())
        self.totalEmissions=0
        self.banned=False

    def ban_user(self):
        """This method sets the banned variable to True.
        
        Author: Igor Palka"""
        self.banned=True
        
        
    def unban_user(self):
        """This method sets the banned variable to False.
        
        Author: Igor Palka"""
        self.banned=False

    def change_password(self,newPassword):
        """This method changes the password variable to a new password.
        
            Takes one variable:
                newPassword: String (length 100)
                
        Author: Igor Palka"""
        self.password=bcrypt.hashpw(newPassword.encode('utf-8'),
                                     bcrypt.gensalt())

    def check_password(self, password):
        """This method compares the values of the password parameter
        with the user's password.

        Parameters:
            password: String (length 100)

        Returns True if password parameter matches self.password,
        False otherwise.
        
        Author: Igor Palka"""
        return bcrypt.checkpw(password.encode('utf-8'),
                              self.password.encode('utf-8'))
    
    def get_signup(self):
        """This method returns the month for the signup.

        This is used in the function 

        Returns User's signUpDate month.
        
        Author: Igor Palka"""
        return self.signUpDate.month
    
    def set_total_emission(self,total):
        """This method sets the totalEmissions variable of a User to
        the value defined in the total parameter.
        
        Parameters:
            total: Float

        Returns void.
        
        Author: Igor Palka"""
        self.totalEmissions = total

    def get_total_emission(self):
        """This method returns the totalEmissions of 
        
        Author: Igor Palka"""
        return self.totalEmissions

class Journey(db.Model, UserMixin):
    """This class is used to store each journey as an entry in a database.
     Class Variables:
        - journeyID: Integer
        - startDate: Datetime
        - userID: Integer
        - transportMethod: String (length 15)
        - length: Float
        - roundTrip: BOOLEAN
        - fuel: String (10)
        - emissions: Float

    Methods:
        - __init__(self, startDate, userID, transportMethod, length, roundTrip, fuel, emissions)
        - get_emissions(self)
        - get_trans_method(self)
        - get_month(self)


    Author: Igor Palka"""
    __tablename__ = 'journeys'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    startDate = db.Column(db.DateTime, nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey(User.id))
    transportMethod = db.Column(db.String(20), nullable=False)
    length = db.Column(db.Float, nullable=False) # This is the length in miles
    roundTrip = db.Column(db.String(15), nullable=False, default=False)
    fuel = db.Column(db.String(20), nullable=False)
    emissions = db.Column(db.Float, nullable=False)

    def __init__(self, startDate, userID, transportMethod, length, roundTrip, fuel, emissions):
        """A method for initializing a new instance.
         Variables
            startDate: Datetime
            userID: Integer
            length: Float 
            roundtrip: BOOLEAN
            fuel: String (10)

        Returns instance object of the Journey Class.

        Author: Igor Palka"""
        self.startDate=startDate
        self.userID= userID
        self.transportMethod=transportMethod
        self.length=length
        self.roundTrip=roundTrip
        self.fuel=fuel
        self.emissions=emissions

    def get_emissions(self):
        """Method to return emissions from a specific journey.

        Returns float.
        
        Author: Igor Palka"""
        return self.emissions
    
    def get_trans_method(self):
        """Method to return transport method from a specific journey.
        
        Returns string.

        Author: Igor Palka"""
        return self.transportMethod

    def get_month(self):
        """Method to return starting month of a journey.

        Returns integer between 1-12.
        
        Author: Igor Palka"""
        return self.startDate.month

def init_db():
    """This method sets up a basic db file in the address recorded
      in the ENV file. 

    This is done by dropping any existing databases, creating a new database,
    and inserting an admin account. 
    
    Author: Igor Palka, James Whitley"""
    from app import app
    with app.app_context():
        db.drop_all()
        db.create_all()
        users = []
        users.append(User(
            firstName= "Admin",
            lastName= "Admin",
            email = "knownAdmin@gmail.com",
            role = "Admin",
            password = "Admin123",
            phone="07654321234"
        ))
        users.append(User("James",
                          "Whitley",
                          "notcoolguy@gmail.com",
                          "User",
                          "testing123",
                          "01211640191"
        ))
        users.append(User("no",
                          "two",
                          "electricBoogaloo@gmail.com",
                          "User",
                          "funnyhaha1!",
                          "63464636464"
        ))
        users.append(User("yes",
                          "no",
                          "maybe@gmail.com",
                          "User",
                          "DoNotjoinacult3",
                          "34436435345"
        ))   
        
        for user in users:
            db.session.add(user) 
        db.session.commit()


# Role checking
def requires_roles(*roles):
    """This meethod implements basic role checking and RBAC functionality.
    
    Author: Aaron Cunningham"""
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            if current_user.role not in roles:
                # Sends a log to the log file if there was an unauthorised access attempts
                return render_template('errors/403.html')
            return f(*args, **kwargs)

        return wrapped

    return wrapper