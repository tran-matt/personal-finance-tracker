from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)

    budgets = db.relationship('Budget', back_populates='user', cascade='all, delete-orphan')
    expenses = db.relationship('Expense', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User id={self.id}, username={self.username}>'


class Budget(db.Model, SerializerMixin):
    __tablename__ = 'budgets'

    id = db.Column(db.Integer, primary_key=True)
    monthly_pay = db.Column(db.Float, nullable=False)
    savings_goal = db.Column(db.Float, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User', back_populates='budgets')
    betables = db.relationship('BeTable', back_populates='budget')

    expenses = association_proxy('betables', 'expense', creator=lambda b: BeTable(expense=b))

    def __repr__(self):
        return f'<Budget {self.id}>'

class Expense(db.Model, SerializerMixin):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User', back_populates='expenses')
    betables = db.relationship('BeTable', back_populates='expense', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Expense {self.id}>'

class BeTable(db.Model, SerializerMixin):
    __tablename__ = 'betables'

    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey('expenses.id'))
    budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id'))

    expense = db.relationship('Expense', back_populates='betables')
    budget = db.relationship('Budget', back_populates='betables')

    def __repr__(self):
        return f'<BeTable {self.id}>'
