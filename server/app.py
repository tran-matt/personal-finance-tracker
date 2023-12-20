from flask import Flask, request, make_response, session
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt  # Import Flask-Bcrypt
from config import app, db
from models import db, User, Budget, Expense, Tag

app.secret_key = b'(WC\x7fvJ\xf7\xb8\xb7X\x81\n\x11{\x00\xb2'
api = Api(app)

class AllUsers(Resource):
    def register_user(self):
        try:
            data = request.get_json()
            new_user = User(username=data.get('username'))
            new_user.password_hash = data.get('password')  # Set the hashed password
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

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')

            user = User.query.filter_by(username=username).first()

            if user and user.check_password(password):  # Use check_password method
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                response_body = {"error": "Invalid username or password"}
                return make_response(response_body, 401)
        except Exception as e:
            print(f"Error during login: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                user = User.query.get(user_id)
                if user:
                    return user.to_dict(), 200
            return {'message': '401: Not Authorized'}, 401
        except Exception as e:
            print(f"Error during session check: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)


api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    def delete(self):
        try:
            # Remove the user_id value from the session
            session.pop('user_id', None)
            return {'message': '204: No Content'}, 204
        except Exception as e:
            print(f"Error during logout: {e}")
            response_body = {"error": "Internal Server Error"}
            return make_response(response_body, 500)

api.add_resource(Logout, '/logout')

@app.before_request
def check_if_logged_in():
    if 'user_id' not in session or not session['user_id']:
        return make_response({'error': 'Unauthorized'}, 401)
    return None

class Document(Resource):
    def get(self, id):
        document = Document.query.filter(Document.id == id).first()
        return document.to_dict()

    def check_authorization(self):
        if not session.get('user_id'):
            return make_response({'error': 'Unauthorized'}, 401)
        return None

    def patch(self, id):
        authorization_result = self.check_authorization()
        if authorization_result:
            return authorization_result
        # Your patch logic here

    def delete(self, id):
        authorization_result = self.check_authorization()
        if authorization_result:
            return authorization_result
        # Your delete logic here
class DocumentList(Resource):
    def get(self):

        documents = Document.query.all()
        return [document.to_dict() for document in documents]

api.add_resource(Document, '/documents/<int:id>', endpoint='document')
api.add_resource(DocumentList, '/documents', endpoint='document_list')


@app.route('/')
def home():
    return "Welcome to the Personal Finance Tracker API!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)
