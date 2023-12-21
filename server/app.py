from flask import Flask, request, make_response, session
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from models import User, Budget, Expense
from config import app, db, api

class AllUsers(Resource):
    def get(self):
        users = User.query.all()
        response_body =[]
        for user in users:
            response_body.append(user.to_dict(rules=('-budgets', '-expenses')))
        return make_response(response_body, 200)

api.add_resource(AllUsers, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)

        if user:
            response_body = user.to_dict(rules=('-budgets.user', '-expenses.user'))
            return make_response(response_body, 200)
        else:
            response_body = {"error": "User not found"}
            return make_response(response_body, 404)

    def delete(self, id):
        user = User.query.get(id)

        if user:
            db.session.delete(user)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {"error": "User not found"}
            return make_response(response_body, 404)

    def put(self, id):
        try:
            user = User.query.get(id)

            if user:
                data = request.get_json()
                user.username = data.get('username', user.username)
                user.password = data.get('password', user.password)

                db.session.commit()

                response_body = user.to_dict(rules=('-budgets.user', '-expenses.user'))
                return make_response(response_body, 200)
            else:
                response_body = {"error": "User not found"}
                return make_response(response_body, 404)
        except Exception as e:
            print(f"Error updating user: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

api.add_resource(UserById, '/users/<int:id>')

class AllBudgets(Resource):
    def get(self):
        try:
            budgets = Budget.query.all()
            response_body = [budget.to_dict(rules=('-user', '-betables')) for budget in budgets]
            return make_response(response_body, 200)
        except Exception as e:
            print(f"Error fetching budgets: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

    def post(self):
        try:
            data = request.get_json()
            user_id = session.get('user_id')  # Retrieve user ID from session

            new_budget = Budget(
                monthly_pay=data.get('monthly_pay'),
                savings_goal=data.get('savings_goal'),
                user_id=user_id  
            )

            db.session.add(new_budget)
            db.session.commit()

            response_body = {
                "id": new_budget.id,
                "monthly_pay": new_budget.monthly_pay,
                "savings_goal": new_budget.savings_goal,
                "user_id": new_budget.user_id
            }
            return make_response(response_body, 201)
        except Exception as e:
            print(f"Error adding budget: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

api.add_resource(AllBudgets, '/budgets')

@app.route('/budgets/<int:id>', methods=['PATCH'])
def update_budget(id):
    try:
        budget = Budget.query.get(id)

        if budget:
            data = request.get_json()
            budget.monthly_pay = data.get('monthly_pay', budget.monthly_pay)
            budget.savings_goal = data.get('savings_goal', budget.savings_goal)

            db.session.commit()

            response_body = budget.to_dict(rules=('-user', '-betables'))
            return make_response(response_body, 200)
        else:
            response_body = {"error": "Budget not found"}
            return make_response(response_body, 404)
    except Exception as e:
        print(f"Error updating budget: {e}")
        response_body = {"error": "Internal Server Error"}
        return make_response(response_body, 500)




class AllExpenses(Resource):
    def get(self):
        expenses = Expense.query.all()
        response_body = [expense.to_dict(rules=('-user', '-betables')) for expense in expenses]
        return make_response(response_body, 200)

    def post(self):
        try:
            data = request.get_json()
            user_id = session.get('user_id')  # Retrieve user ID from session

            new_expense = Expense(
                amount=data.get('amount'),
                category=data.get('category'),
                date=datetime.utcnow(),  # Use current date/time
                user_id=user_id,
            )

            db.session.add(new_expense)
            db.session.commit()

            response_body = {
                "id": new_expense.id,
                "userId": new_expense.user_id,
                "date": new_expense.date.strftime('%Y-%m-%d %H:%M:%S'),  # Format date as needed
                "category": new_expense.category,
                "amount": new_expense.amount,
            }
            return make_response(response_body, 201)
        except Exception as e:
            print(f"Error adding expense: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

api.add_resource(AllExpenses, '/expenses')

class UserTags(Resource):
    def get(self, id):
        user = User.query.get(id)

        if user:
            tags = user.tags
            response_body = [tag.to_dict() for tag in tags]
            return make_response(response_body, 200)
        else:
            response_body = {"error": "User not found"}
            return make_response(response_body, 404)

api.add_resource(UserTags, '/users/<int:id>/tags')

# class Login(Resource):
#     def post(self):
#         user = User.query.filter_by(username=request.json.get('username')).first()

#         if user:
#             session['user_id'] = user.id
#             response_body = user.to_dict(rules=('-budgets.user', '-expenses.user'))
#             return make_response(response_body, 201)
#         else:
#             response_body = {
#                 "error": "Invalid username!"
#             }
#             return make_response(response_body, 401)
            

# api.add_resource(Login, '/login')

# class CheckSession(Resource):
#     def get(self):
#         user = User.query.filter_by(id=session.get('user_id')).first()

#         if user:
#             response_body = user.to_dict(rules=('-budgets', '-expenses'))
#             return make_response(response_body, 200)
#         else:
#             response_body = {
#                 "error": "Please log in!"
#             }
#             return make_response(response_body, 401)

# api.add_resource(CheckSession, '/check_session')

# class Logout(Resource):
#     def delete(self):
#         session.pop('user_id', None)
#         response_body = {}
#         return make_response(response_body, 204)

# api.add_resource(Logout, '/logout')

@app.route('/')
def home():
    return "Welcome to the Personal Finance Tracker API!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)
