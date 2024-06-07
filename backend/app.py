from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
import json
from models import db, Product

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Dummy JSON API URL
dummyjson_url = 'https://dummyjson.com/products?qty=10'

# Route to fetch data from dummyjson and store in database
@app.route('/fetch-and-store-products', methods=['GET'])
def fetch_and_store_products():
    try:
        # Fetch data from dummyjson API
        response = requests.get(dummyjson_url)
        data = json.loads(response.text)
        
        # Clear existing data in the Products table
        db.session.query(Product).delete()
        db.session.commit()

        # Store fetched data in the database
        for item in data:
            product = Product(
                name=item['name'],
                description=item['description'],
                price=float(item['price']),
                quantity=int(item['quantity'])
            )
            db.session.add(product)

        db.session.commit()
        return jsonify({'message': 'Products fetched and stored successfully'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Failed to fetch and store products'}), 500

# Routes for CRUD operations on products
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    serialized_products = [{'id': product.id,
                            'name': product.name,
                            'description': product.description,
                            'price': product.price,
                            'quantity': product.quantity} for product in products]
    return jsonify(serialized_products), 200

@app.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(name=data['name'], 
                          description=data['description'], 
                          price=data['price'], 
                          quantity=data['quantity'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get(product_id)
    if product:
        data = request.get_json()
        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        product.quantity = data['quantity']
        db.session.commit()
        return jsonify({'message': 'Product updated successfully'}), 200
    else:
        return jsonify({'error': 'Product not found'}), 404

@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    else:
        return jsonify({'error': 'Product not found'}), 404

# Run the application
if __name__ == '__main__':
    app.run(debug=True)