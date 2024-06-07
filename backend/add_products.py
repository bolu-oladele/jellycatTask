from flask import Flask
from app import db, Product  # Adjust import as per your setup

# Create a Flask application context
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

    # Create a list of products
    products = [
        {'name': 'Product 1', 'description': 'Description of Product 1', 'price': 19.99, 'quantity': 10},
        {'name': 'Product 2', 'description': 'Description of Product 2', 'price': 29.99, 'quantity': 15},
        {'name': 'Product 3', 'description': 'Description of Product 3', 'price': 39.99, 'quantity': 5},
    ]

    # Add products to the database
    for product_data in products:
        new_product = Product(
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            quantity=product_data['quantity']
        )
        db.session.add(new_product)

    # Commit the changes
    db.session.commit()

print('Products added successfully!')