import React from "react";
import { color, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* 🔥 Hero Section */}
      <section className="hero-section">
        <div className="overlay"></div>
        <motion.div
          className="hero-content"
          // initial={{ opacity: 6, y: 60 }}
          // animate={{ opacity: 1, y: 60 }}
          transition={{ duration: 1 }}
        >
          
          <h1 >🍴Bite & Dine🍴</h1>
          <p><h4>Discover. Order. Enjoy. — The Best Food in Town!</h4></p>

          <button className="explore-btn" onClick={() => navigate("/menu")}>
            Explore Menu
          </button>
        </motion.div>
      </section>

      {/* 😋 Categories Section */}
      <section className="categories">
        <h2>Our Special Categories</h2>
        <div className="card-container">
          {[
            { name: "Pizzas", img: "/public/food-1.jpg" },
            { name: "Burgers", img: "/public/food-2.jpg" },
            { name: "Desserts", img: "/public/food-38.jpg" },
            { name: "Drinks", img: "/public/food-30.jpg" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img src={item.img} alt={item.name} />
              <div className="card-info">
                <h3>{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ❤️ Why Choose Us Section (Glassmorphic Apple Style) */}
<section className="whychoose-section">
  <div className="whychoose-content">
    <h2>Why Choose Us?</h2>
    <p className="whychoose-motto">
      At <b>🍴Bite & Dine🍴</b>, we serve happiness wrapped in every meal —
      delicious, fresh, and full of love. 💖
    </p>

    <div className="whychoose-features">
      <div className="feature-item">
        <img src="/public/fresh.jpg" alt="Fresh" />
        <p>Fresh & Delicious</p>
      </div>
      <div className="feature-item">
        <img src="/public/delivery.jpg" alt="Delivery" />
        <p>Fast Delivery</p>
      </div>
      <div className="feature-item">
        <img src="/public/happy.jpg" alt="Happy Customers" />
        <p>1000+ Happy Customers</p>
      </div>
    </div>
  </div>
</section>


      {/* 🧑‍🍳 About Us Section */}
      <section className="aboutus-section">
        <motion.h2
          className="aboutus-title"
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="aboutus-subtitle"
          // initial={{ x: 150, opacity: 0 }}
          // whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          At <b><h3>🍴Bite & Dine🍴</h3></b> We serve happiness wrapped in every meal —
          delicious, fresh, and full of love. 💖
        </motion.p>

        <motion.div
          className="flip-card-container"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Card 1 */}
          <motion.div
            className="flip-card"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <h3>🧑‍🍳 Our Mission</h3>
              </div>
              <div className="flip-back">
                <p>
                  “Cooking is love made visible.” <br /> We make every meal a
                  memorable experience, cooked with care and served with passion.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="flip-card"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <h3>⭐ Our Ratings</h3>
              </div>
              <div className="flip-back">
                <h4>4.9 / 5</h4>
                <p>Rated by over 5,000+ happy customers!</p>
                <p>Thank you for loving our flavors 🤍</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="flip-card"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <h3>📍 Our Branches</h3>
              </div>
              <div className="flip-back">
                <ul>
                  <li>Chandigarh</li>
                  <li>Delhi</li>
                  <li>Mumbai</li>
                </ul>
                <p>Expanding soon to Bangalore 🚀</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 🌐 Footer Section */}
      <footer className="footer">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="footer-left">
            <h3>🍴Bite & Dine🍴</h3>
            <p>
              Bringing flavor, fun, and freshness right to your doorstep.
              Taste the difference today!
            </p>
          </div>

          

          <div className="footer-center">
  <h4>Contact Us</h4>

  <p
  style={{ cursor: "pointer", color: "#00bcd4" }}
  onClick={() => navigate("/contact")}
>
  📫 Email: support@biteanddine.com
</p>
  <p>☎️ Phone: +91 9463464244</p>
</div>



          <div className="footer-right">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>© 2025 Bite & Dine. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}




// import React from "react";
// import { color, motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import "./homepage.css";

// export default function Home({user}) {
//   const navigate = useNavigate();
//   const userEmail = user?.email || "guest@example.com";
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ ADDED: NodeMailer trigger function
//   const handleEmailClick = async () => {
//     if (!message) return alert("Please type your message first!");
//     try {
//       const res = await fetch("http://localhost:4000/api/send-mail", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userEmail: userEmail,
//           message: message
//         })
//       });

//       const data = await res.json();
//       alert(data.message);
//       setMessage("");
//       setShowModal(false);
//     } catch (error) {
//       alert("Email service not available ❌");
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* 🔥 Hero Section */}
//       <section className="hero-section">
//         <div className="overlay"></div>
//         <motion.div
//           className="hero-content"
//           transition={{ duration: 1 }}
//         >
//           <h1>🍴Bite & Dine🍴</h1>
//           <h4>Discover. Order. Enjoy. — The Best Food in Town!</h4>

//           <button className="explore-btn" onClick={() => navigate("/menu")}>
//             Explore Menu
//           </button>
//         </motion.div>
//       </section>

//       {/* 😋 Categories Section */}
//       <section className="categories">
//         <h2>Our Special Categories</h2>
//         <div className="card-container">
//           {[
//             { name: "Pizzas", img: "/food-1.jpg" },
//             { name: "Burgers", img: "/food-2.jpg" },
//             { name: "Desserts", img: "/food-38.jpg" },
//             { name: "Drinks", img: "/food-30.jpg" },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               className="card"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <img src={item.img} alt={item.name} />
//               <div className="card-info">
//                 <h3>{item.name}</h3>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ❤️ Why Choose Us */}
//       <section className="whychoose-section">
//         <div className="whychoose-content">
//           <h2>Why Choose Us?</h2>
//           <p className="whychoose-motto">
//             At <b>🍴Bite & Dine🍴</b>, we serve happiness wrapped in every meal —
//             delicious, fresh, and full of love. 💖
//           </p>

//           <div className="whychoose-features">
//             <div className="feature-item">
//               <img src="/fresh.jpg" alt="Fresh" />
//               <p>Fresh & Delicious</p>
//             </div>
//             <div className="feature-item">
//               <img src="/delivery.jpg" alt="Delivery" />
//               <p>Fast Delivery</p>
//             </div>
//             <div className="feature-item">
//               <img src="/happy.jpg" alt="Happy Customers" />
//               <p>1000+ Happy Customers</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 🧑‍🍳 About Us */}
//       <section className="aboutus-section">
//         <motion.h2
//           className="aboutus-title"
//           initial={{ x: -150, opacity: 0 }}
//           whileInView={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           About Us
//         </motion.h2>

//         <motion.p
//           className="aboutus-subtitle"
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           At <b><h3>🍴Bite & Dine🍴</h3></b> We serve happiness wrapped in every meal —
//           delicious, fresh, and full of love. 💖
//         </motion.p>
//       </section>

//       {/* 🌐 Footer Section */}
//       <footer className="footer">
//         <motion.div
//           className="footer-content"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="footer-left">
//             <h3>🍴Bite & Dine🍴</h3>
//             <p>
//               Bringing flavor, fun, and freshness right to your doorstep.
//               Taste the difference today!
//             </p>
//           </div>

//           {/* ✅ ONLY THIS PART CHANGED */}
//           <div className="footer-center">
//             <h4>Contact Us</h4>
//             <p>
//               📫 Email:{" "}
//               <button
//                 onClick={() => setShowModal(true)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   color: "#007bff",
//                   cursor: "pointer",
//                   paddingLeft: "5px"
//                 }}
//               >
//                 support@biteanddine.com
//               </button>
//             </p>
//             <p>☎️Phone: +91 98765 43210</p>
//           </div>

//           <div className="footer-right">
//             <h4>Follow Us</h4>
//             <div className="social-links">
//               <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
//                 <i className="fab fa-instagram"></i> Instagram
//               </a>
//               <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
//                 <i className="fab fa-facebook"></i> Facebook
//               </a>
//               <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
//                 <i className="fab fa-twitter"></i> Twitter
//               </a>
//             </div>
//           </div>
//         </motion.div>

//         <div className="footer-bottom">
//           <p>© 2025 Bite & Dine. All Rights Reserved.</p>
//         </div>

//         {/* ✅ Modal for message */}
//         {showModal && (
//           <div className="modal-backdrop">
//             <div className="modal-content">
//               <h3>Send us a message</h3>
//               <textarea
//                 placeholder="Type your message here..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <div className="modal-buttons">
//                 <button onClick={handleEmailClick}>Send</button>
//                 <button onClick={() => setShowModal(false)}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}

//       </footer>
//     </div>
//   );
// }
