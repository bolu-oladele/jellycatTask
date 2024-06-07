# Online Store Application

## Project Description

This project is an online store application developed with a frontend built in React with TypeScript, Redux, and Tailwind CSS, and a backend API built with Flask, Python, and SQLite. The application allows users to view a list of products, sort and filter them, add products to a cart, and paginate through the product list.

## Features

- Product listing page with sorting and filtering options.
- Ability to add products to a cart.
- Pagination for product listing.
- Styled with Tailwind CSS for a clean and responsive design.

## Installation and Setup

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. **Set up a virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask application**:
   ```bash
   python app.py
   ```

### Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the React application**:
   ```bash
   npm start
   ```

## How to Use

- Open your browser and go to http://localhost:3000 to view the product listing.
- Sort products by clicking the "Sort by Price" button.
- Filter products by typing in the "Filter by Name" input field.
- Click the "Add to Cart" button to add products to your cart.
- Navigate through pages using the pagination buttons.

## Testing

No specific tests have been implemented for this project.

## Assumptions and Simplifications

- The project assumes that the backend is running on `http://localhost:5000`.
- Tailwind CSS is used for basic styling.
- SQLite is used for simplicity and ease of setup.
- Instead of using dummyjson.com, simple product examples were used to populate the database. After setting up the database I was unsure if I was still meant to use the dummyjson api or not.
- The application does not currently include any test suites.
