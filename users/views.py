# IMPORTS
import logging
from flask import Blueprint, render_template, flash, redirect, url_for, request,jsonify
from users.forms import RegisterForm, LoginForm, PasswordForm, deleteAccountForm
from models import User, db, Journey, requires_roles
from flask_login import login_user, current_user, logout_user, login_required
from markupsafe import Markup
from display_calculations import least_eco_friendly_result,most_eco_friendly_result,total_consumption_result, total_mode_of_transport_emissions, total_emissions_by_month
# CONFIG
users_blueprint = Blueprint('users', __name__, template_folder='templates')

# VIEWS
@users_blueprint.route('/admin_register', methods=['GET', 'POST'])
@login_required
@requires_roles('Admin')
def admin_register():
    """
    This function will add a new admin to the database
    
    Author of this function: Aaron Cunningham & Lauren Harbige
    """
    # create signup form object
    form = RegisterForm()

    # if request method is POST or form is valid
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()

        # if email already exists redirect user back to signup page with error message so user can try again
        if user:
            flash('Email address already exists')
            return render_template('users/register.html', form=form)

        # create a new user with the form data
        new_admin = User(email=form.email.data,
                        firstName=form.firstname.data,
                        lastName=form.lastname.data,
                        phone=form.phone.data,
                        password=form.password.data,
                        role='Admin')

        # add the new user to the database
        db.session.add(new_admin)
        db.session.commit()
        logging.warning('SECURITY - Admin Registered [%s, %s]', form.email.data, request.remote_addr)
        #Flashing a message to let the admin know a new admin has been added
        flash(Markup('New admin has been added to the system, authorisation set up manually'))
    
        return redirect(url_for('admin.admin'))
    # if request method is GET or form not valid re-render signup page
    return render_template('users/register.html', form=form)

# view registration
@users_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    """
    This function will add a new user to the database
    
    Author of this function: Aaron Cunningham & Lauren Harbige
    """
    
    if current_user.is_authenticated:
            if current_user.role == 'Admin':
                flash("This account is already registered")
                return redirect(url_for('admin.admin'))
            elif current_user.role == 'user':
                flash("This account is already registered")
                return redirect(url_for('users.account'))
    # create signup form object
    form = RegisterForm()

    # if request method is POST or form is valid
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        # if this returns a user, then the email already exists in database

        # if email already exists redirect user back to signup page with error message so user can try again
        if user:
            flash('Email address already exists')
            return render_template('users/register.html', form=form)

        # create a new user with the form data
        new_user = User(email=form.email.data,
                        firstName=form.firstname.data,
                        lastName=form.lastname.data,
                        phone=form.phone.data,
                        role='user',
                        password=form.password.data
                        )

        # add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        # logs everytime somebody registers
        logging.warning('SECURITY - User Registered [%s, %s]', form.email.data, request.remote_addr)
        # sends user to login page
        return redirect(url_for('users.login'))
    # if request method is GET or form not valid re-render signup page
    return render_template('users/register.html', form=form)


# view user login
@users_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    
    """
    This allows for a user to login to their account
    
    Author of this function: Aaron Cunningham
    """
    
    # If user is already logged in they will be redirected
    if current_user.is_authenticated:
        if current_user.role == 'Admin':
            flash("This account is already logged in")
            return redirect(url_for('admin.admin'))
        elif current_user.role == 'user':
            flash("This account is already logged in")
            return redirect(url_for('users.account'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if not user or not user.check_password(form.password.data):
            flash(Markup(
                    'Incorrect username or password'))

            logging.warning('SECURITY - Invalid login attempt [%s, %s]',
                            form.email.data,
                            request.remote_addr)

            return render_template('users/login.html', form=form)
        # Blocks a banned user from signing in
        elif user.banned:
            flash(Markup('You have been banned from this application'))
        else:
            login_user(user)
            logging.warning('SECURITY - Logged in [%s, %s]',
                            current_user.email,
                            request.remote_addr)
        
            return redirect(url_for('index')) # redirect to the main page after login
    return render_template('users/login.html', form=form)


# Logs out a user
@users_blueprint.route('/logout')
@login_required
def logout():
    """
    This function will log a user out of the application
    
    Author of this function: Aaron Cunningham & Lauren Harbige
    """
    logging.warning('SECURITY - Log out [%s, %s]',
                    current_user.email,
                    request.remote_addr)
    logout_user()
    return redirect(url_for('index'))

# view change password
@users_blueprint.route('/change_password', methods=['POST', 'GET'])
@login_required
def change_password():
    """
    This function will update a users password.
    
    Author of this function: Aaron Cunningham and Lauren Harbige
    """
    form = PasswordForm()
    if form.validate_on_submit():
        if not current_user.check_password(form.current_pass.data):
            flash('Current password needs to match the current password on your account')
        elif current_user.check_password(form.new_pass.data):
            flash('New password cannot be the same as your old password')
        else:
            current_user.change_password(form.new_pass.data)
            db.session.commit()
            flash('Password changed successfully')
            return redirect(url_for('users.account'))
    return render_template('users/change_pass.html', form=form)

# view user account
@users_blueprint.route('/account', methods=['POST', 'GET'])
@login_required
def account():
    """
    This function renders the account page, and displays up to date information about:
    Most eco friendly journey
    Least eco friendly journey
    Total emissions
    Account information
    
    Author of this function: Aaron Cunningham and Igor Palka
    """
    #TODO: Update the placeholders with current users info
    form = deleteAccountForm()
    if form.validate_on_submit():
        Journey.query.filter_by(userID=current_user.id).delete(synchronize_session=False)
        User.query.filter_by(id=current_user.id).delete(synchronize_session=False)
        db.session.commit()
        flash("Your account has been deleted")
        return redirect(url_for('index'))
    return render_template('users/account.html',
                           email=current_user.email,
                           firstname=current_user.firstName,
                           lastname=current_user.lastName,
                           phone=current_user.phone,
                           leastEcoFriendly = least_eco_friendly_result(current_user.id),
                           mostEcoFriendly=most_eco_friendly_result(current_user.id),
                           totalConsumption = total_consumption_result(current_user.id), form=form)


@users_blueprint.route('/user/transport', methods=['GET'])
@login_required
def get_user_transport():
    """
    This function sends data from the database to the URI so a user can view their transport specific emissions on the account page graph
    
    Author of this function: Aaron Cunningham
    """
    data = total_mode_of_transport_emissions(current_user.id)
    return jsonify(data)
    
    
@users_blueprint.route('/user/emissions', methods=['GET'])
@login_required
def get_user_emissions():
    """
    This function sends data from the database to the URI so a user can view their monthly specific emissions on the account page graph
    
    Author of this function: Aaron Cunningham
    """
    data = total_emissions_by_month(current_user.id)
    return jsonify(data)