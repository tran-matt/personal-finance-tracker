from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Budget, Expense

user_tag_association_values = []

def create_user(fake):
    return User(
        username=fake.user_name(),
        password=fake.password()
    )

def create_budget(user, fake):
    return Budget(
        monthly_pay=randint(1000, 5000),
        savings_goal=randint(100, 1000),
        user=user
    )

def create_expense(user, fake):
    return Expense(
        amount=randint(1, 100),
        category=rc(['Groceries', 'Utilities', 'Entertainment', 'Transportation']),
        date=fake.date_time_this_month(),
        user=user
    )

def create_expense_with_tag(user, fake):
    expense = create_expense(user, fake)
    
    # Choose a random tag for the expense
    tag = Tag.query.order_by(func.random()).first()
    
    # Assign a category (tag_value) to the expense
    tag_value = 'Food' if tag.name == 'Groceries' else 'Entertainment'
    
    # Associate the tag with the user and provide the tag_value
    user.tags.append(tag)
    user_tag_association_values.append({
        'user_id': user.id,
        'tag_id': tag.id,
        'tag_value': tag_value
    })

    # Associate the tag with the expense
    expense.tags.append(tag)

    return expense

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        # Creates and adds users to the database
        users = [create_user(fake) for _ in range(5)]
        db.session.add_all(users)
        db.session.commit()

        # Creates and adds budgets and expenses for each user
        for user in users:
            budget = create_budget(user, fake)
            db.session.add(budget)

            expenses = [create_expense(user, fake) for _ in range(5)]
            db.session.add_all(expenses)

        db.session.commit()

        print("Seeding complete!")
