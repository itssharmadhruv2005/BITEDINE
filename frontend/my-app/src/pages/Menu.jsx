import React, { useEffect, useState } from "react";
import "./menu.css";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState("Regulars"); // default tab

  useEffect(() => {
    fetch("http://localhost:4000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  if (loading) {
    return <h2 className="loading">Loading menu...</h2>;
  }

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [
    "Regulars",
    "Snacks",
    "Burgers",
    "Pizzas",
    "Drinks",
    "Cakes",
    "Sweets",
  ];
  const categorizedMenu = {};
  categories.forEach((cat) => {
    categorizedMenu[cat] = filteredMenu.filter((item) => item.category === cat);
  });

  function updateQuantity(id, change) {
    setQuantities((prev) => {
      const newQty = (prev[id] || 1) + change;
      return { ...prev, [id]: Math.max(1, newQty) };
    });
  }

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((c) => c.id === item.id.toString());
    const qty = quantities[item.id] || 1;

    if (idx === -1) {
      cart.push({ ...item, id: item.id.toString(), qty });
    } else {
      cart[idx].qty += qty;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} (${qty}) added to cart`);
  }

  return (
    <div className="menu-page">
      <h1 className="menu-title">🍴 Bite & Dine Menu</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search for a dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Category Tabs */}
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Show only active category */}
      <div className="category-section fade-in">
        <h2 className="category-title">{activeCategory}</h2>
        <div className="menu-grid">
          {categorizedMenu[activeCategory].length > 0 ? (
            categorizedMenu[activeCategory].map((item) => (
              <div key={item.id} className="menu-card">
                {item.image && (
                  <img src={item.image} alt={item.name} className="menu-img" />
                )}
                <h3 className="dish-name">{item.name}</h3>
                <p className="dish-desc">{item.description}</p>
                <p className="dish-price">₹{item.price}</p>

                {/* Quantity buttons */}
                <div className="qty-box">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="qty-btn minus"
                  >
                    -
                  </button>
                  <span className="qty-count">{quantities[item.id] || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="qty-btn plus"
                  >
                    +
                  </button>
                </div>

                <button className="cart-btn" onClick={() => addToCart(item)}>
                  🛒 Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#999" }}>
              No items found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
