
import re
from flask_wtf import FlaskForm,RecaptchaField
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length


def character_check(form, field):
    """
    This function checks for disallowed characters

    Author of this function: Aaron Cunningham
    """
    # Excludes these chars
    excluded_chars = "*?!'^+%&/()=}][{$#@<>"
    for char in field.data:
        if char in excluded_chars:
            # Shows the user which char isn't allowed
            raise ValidationError(f"Character {char} is not allowed.")

def phone_check(form, field):
    p = re.compile(r'^[0-9]*$')
    if not p.match(field.data):
        raise ValidationError(
    "Phone number must consist of just numbers.")

def password_check(form, field):
    """
    This function checks the validation of the password

    Author of this function: Aaron Cunningham
    """
    # Regular expression restricting what needs to be in password
    p = re.compile(r'(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])')
    if not p.match(field.data):
        # If format doesn't match show message
        raise ValidationError(
            "Password must contain 1 digit, 1 lowercase letter, 1 uppercase letter and, 1 special character, and 6-12 characters in length.")
        

class RegisterForm(FlaskForm):
    """
    This class creates the form fields and validators for register form

    Author of this function: Aaron Cunningham
    """
    email = StringField('Email', validators=[DataRequired(), Email()])
    firstname = StringField('First name', 
                            validators=[DataRequired(), character_check])
    lastname = StringField('Last name',
                            validators=[DataRequired(), character_check])
    phone = StringField('Phone number', validators=[DataRequired(), phone_check])
    password = PasswordField('Password',
                            validators=[DataRequired(), password_check,
                            Length(min=6, max=12)])
    confirm_password = PasswordField('Confirm password',
                                    validators=[DataRequired(),
                                    Length(min=6, max=12),
                                    EqualTo('password', message='Passwords must match')])
    submit = SubmitField()


class LoginForm(FlaskForm):
    """
    This class creates the form fields and validators for login form

    Author of this function: Aaron Cunningham
    """
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    recaptcha = RecaptchaField()
    submit = SubmitField()


class PasswordForm(FlaskForm):
    """
    This class creates the form fields and validators for change password form

    Author of this function: Lauren Harbige
    """

    current_pass = PasswordField(id="password", validators=[DataRequired()])
    new_pass = PasswordField(validators=[DataRequired(), Length(min=6, max=12), password_check])
    confirm_pass = PasswordField(validators=[DataRequired(), EqualTo("new_pass", "Both password fields must be equal")])
    submit = SubmitField("Change Password")


class deleteAccountForm(FlaskForm):
    """
    This class confirms deletion

    Author of this function: Aaron Cunningham
    """
    confirmDeletion = SubmitField('Yes')