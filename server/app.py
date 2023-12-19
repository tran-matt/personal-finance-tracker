
from flask import Flask, request, make_response
from flask_restful import Api, Resource
from config import app, db
from models import db, User, Budget, Expense, Tag

api = Api(app)

class AllUsers(Resource):
    def get(self):
        try:
            users = User.query.all()
            response_body = [user.to_dict(rules=('-budgets', '-expenses')) for user in users]
            return make_response(response_body, 200)
        except Exception as e:
            print(f"Error in /users endpoint: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

    def post(self):
        try:
            data = request.get_json()
            new_user = User(username=data.get('username'), password=data.get('password'))
            db.session.add(new_user)
            db.session.commit()
            response_body = new_user.to_dict(rules=('-budgets', '-expenses'))
            return make_response(response_body, 201)
        except Exception as e:
            print(f"Error creating a new user: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

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
                # Update user fields based on the incoming JSON data
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
        budgets = Budget.query.all()
        response_body = [budget.to_dict(rules=('-user.budgets', '-user.expenses')) for budget in budgets]
        return make_response(response_body, 200)

api.add_resource(AllBudgets, '/budgets')

class AllExpenses(Resource):

    def get(self):
        expenses = Expense.query.all()
        response_body = [expense.to_dict(rules=('-user.budgets', '-user.expenses')) for expense in expenses]
        return make_response(response_body, 200)

api.add_resource(AllExpenses, '/expenses')

class UserTags(Resource):
    def get(self, id):
        user = User.query.get(id)

        if user:
            tags = user.tags
            response_body = [tag.to_dict() for tag in tags]
            return make_response(response_body, 200)
        else:
            response_body = {
                "error": "User not found"
            }
            return make_response(response_body, 404)

api.add_resource(UserTags, '/users/<int:id>/tags')

@app.route('/')
def home():
    return "Welcome to the Personal Finance Tracker API!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)
