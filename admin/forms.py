"""
Author of this file: Lauren Harbige
"""
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class LogsForm(FlaskForm):
    submit = SubmitField("Click here")


class BanForm(FlaskForm):
    account_number = StringField(validators=[DataRequired()])
    submit = SubmitField('Ban Account')
    
    
class UnbanForm(FlaskForm):
    account_number = StringField(validators=[DataRequired()])
    submit = SubmitField('Unban Account')


