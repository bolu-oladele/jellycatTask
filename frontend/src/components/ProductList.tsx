import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [cart, setCart] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filteredProducts with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const handleSort = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filteredProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="sort" className="mr-2 font-semibold">
            Sort by Price:
          </label>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
            onClick={handleSort}
          >
            {sortOrder === "asc" ? "High to Low" : "Low to High"}
          </button>
          <label htmlFor="filter" className="mr-2 font-semibold">
            Filter by Name:
          </label>
          <input
            type="text"
            id="filter"
            value={filterValue}
            onChange={handleFilter}
            className="border rounded-md px-2 py-1"
          />
        </div>
        <div>
          <span className="mr-2 font-semibold">Cart:</span>
          <IoCartOutline className="text-3xl text-blue-500 cursor-pointer" />
          <span className="ml-2">{cart.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600">${product.price}</p>
            <p className="text-gray-500">Quantity: {product.quantity}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 mx-1 rounded-md`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
