# IMPORTS

from flask import Blueprint, render_template, flash, jsonify, request
from admin.forms import BanForm, UnbanForm
from flask_login import current_user, login_required
from models import User, db, requires_roles
from display_calculations import admin_user_rate

# CONFIG
admin_blueprint = Blueprint('admin', __name__, template_folder='templates')


@admin_blueprint.route('/admin/logs', methods=['GET', 'POST'])
@login_required
@requires_roles('Admin')
def logs_form_helper():
    """
    This function sets up the pages which display all the security logs with the most recent first,
    this will show up as a separate page to the admin page

    Author of this function: Lauren Harbige
    """
    with open("security.log", "r") as f:
        content = f.read().splitlines()
        content.reverse()

    page = request.args.get('page', 1, type=int)
    page_items = 10
    total_logs = len(content)
    total_pages = (total_logs + page_items - 1) // page_items

    start = (page - 1) * page_items
    end = start + page_items
    logs = content[start:end]

    return render_template('admin/logs.html', logs=logs, page=page,
                           total_pages=total_pages)
@login_required
@requires_roles('Admin')
def ban_form_helper(ban_form):
    """
    This function bans a user from being able to log in and use their account,
    but their details are still in the database.

    Author of this function: Aaron Cunningham & Igor Palka
    """
    if ban_form.validate_on_submit():
        userToBan = User.query.filter_by(id=ban_form.account_number.data).first()
        if userToBan:
            userToBan.ban_user()
            flash("User has been banned")
            db.session.commit()
        else:
            flash("User does not exist. Check the user ID")
    return ban_form

@login_required
@requires_roles('Admin')
def unban_form_helper(unban_form):
    """
    This function unbans a user so they will now be able to log in
    and use their account

    Author of this function: Aaron Cunningham & Igor Palka
    """
    if unban_form.validate_on_submit():
        userToUnban = User.query.filter_by(id=unban_form.account_number.data).first()
        if userToUnban:
            userToUnban.unban_user()
            flash("User has been unbanned")
            db.session.commit()
        else:
            flash("User does not exist. Check the user ID")
    return unban_form


@admin_blueprint.route('/admin/user_data', methods=['GET'])
@login_required
@requires_roles('Admin')
def get_user_data():
    """
    Sends the data from the database to the URI of the graph that displays sign ups on the Admin page
    
    Author of this function: Aaron Cunningham
    """
    data = admin_user_rate()
    return jsonify(data)


@admin_blueprint.route('/admin', methods=['GET', 'POST'])
@login_required
@requires_roles('Admin')
def admin():
    """
    Checking which form is to be used based on what the user has selected

    Author of this function: Aaron Cunningham
    """
    ban_form = BanForm()
    unban_form = UnbanForm()
    if 'ban' in request.form:
        ban_form = ban_form_helper(ban_form)
    elif 'unban' in request.form:
        unban_form = unban_form_helper(unban_form)
        
    return render_template('admin/admin.html', ban_form=ban_form, unban_form= unban_form, name=current_user.firstName)




