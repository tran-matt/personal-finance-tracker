from faker import Faker
from app import app
from models import db, User, Budget, Expense, BeTable
from random import randint, choice

# Define budget categories
BUDGET_CATEGORIES = [
    "Housing",
    "Transportation",
    "Food",
    "Insurance",
    "Debt Payments",
    "Personal Care",
    "Entertainment",
    "Savings",
    "Education",
    "Clothing",
    "Gifts/Donations",
    "Miscellaneous"
]

def create_user(fake):
    return User(
        username=fake.user_name(),
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
        category=choice(BUDGET_CATEGORIES),
        date=fake.date_time_this_month(),
        user=user
    )

def create_expense_with_be_table(user, fake, budget):
    expense = create_expense(user, fake)

    be_table = BeTable(expense=expense, budget=budget)
    db.session.add(be_table)

    return expense

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        # Creates and adds users to the database
        users = [create_user(fake) for _ in range(5)]
        db.session.add_all(users)
        db.session.commit()

        # Creates and adds a budget for each user
        for user in users:
            budget = create_budget(user, fake)
            db.session.add(budget)

            # Creates and adds expenses and BeTables for each user
            expenses = [create_expense_with_be_table(user, fake, budget) for _ in range(5)]

        db.session.commit()

        print("Seeding complete!")
