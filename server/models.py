from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from flask import Flask
from config import *


user_tag_association = db.Table('user_tag_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id')),
    db.Column('tag_value', db.String),  # Represents the category of the expense
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False) 

    # Adding the many-to-many relationship with Tag
    tags = db.relationship('Tag', secondary=user_tag_association, back_populates='users')

    budgets = db.relationship('Budget', back_populates='user', cascade='all, delete-orphan')
    expenses = db.relationship('Expense', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.username}>'

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    # Many-to-many relationship with User
    users = db.relationship('User', secondary=user_tag_association, back_populates='tags')

    def __repr__(self):
        return f'<Tag {self.name}>'


class Budget(db.Model, SerializerMixin):
    __tablename__ = 'budgets'

    id = db.Column(db.Integer, primary_key=True)
    monthly_pay = db.Column(db.Float, nullable=False)
    savings_goal = db.Column(db.Float, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='budgets')

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

    def __repr__(self):
        return f'<Expense {self.id}>'