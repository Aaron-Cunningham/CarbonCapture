
from flask_wtf import FlaskForm,RecaptchaField
from wtforms import StringField, SubmitField, PasswordField, IntegerField, BooleanField, FloatField, RadioField
from wtforms.validators import DataRequired, Email, EqualTo, Length




class CarForm(FlaskForm):
    submit = SubmitField()
    
    
class TrainForm(FlaskForm):
    submit = SubmitField()


class BusForm(FlaskForm):
    submit = SubmitField()
    
class FlightForm(FlaskForm):
    subtmit = SubmitField()
    
class MotorbikeForm(FlaskForm):
    submit =SubmitField()