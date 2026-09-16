import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [strength, setStrength] = useState({ level: "", color: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function evaluateStrength(password) {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score === 0) return { level: "", color: "" };
    if (score <= 1) return { level: "Weak", color: "red" };
    if (score === 2 || score === 3) return { level: "Medium", color: "orange" };
    if (score >= 4) return { level: "Strong", color: "lime" };
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    if (name === "password") setStrength(evaluateStrength(value));
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }
      alert(`Welcome, ${data.user.name}!`);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        // background:
        //   "linear-gradient(135deg, #ff7b54 0%, #ff9770 50%, #ffd280 100%)",
        backgroundImage: 'url("/public/back2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "90%",
          maxWidth: "420px",
          padding: "40px 30px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "black",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "700",
            background: "linear-gradient(45deg, orange, red)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🙏Create Account
        </h2>

        {["name", "email"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field === "name" ? "Full Name" : "Email Address"}
            value={form[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.81)",
              color: "black",
              fontSize: "15px",
              outline: "none",
            }}
          />
        ))}

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.75)",
              color: "black",
              fontSize: "15px",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "rgba(255, 255, 255, 0.73)",
              border: "none",
              borderRadius: "6px",
              padding: "4px 10px",
              cursor: "pointer",
              color: "#222",
              fontWeight: "600",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Password Strength Meter */}
        {form.password && (
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <div
              style={{
                height: "6px",
                borderRadius: "4px",
                backgroundColor: "#eee",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width:
                    strength.level === "Weak"
                      ? "33%"
                      : strength.level === "Medium"
                      ? "66%"
                      : "100%",
                  backgroundColor: strength.color,
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <small style={{ color: strength.color }}>
              {strength.level && `Password: ${strength.level}`}
            </small>
          </div>
        )}

        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.78)",
              color: "black",
              fontSize: "15px",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((s) => !s)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "rgba(255, 255, 255, 0.77)",
              border: "none",
              borderRadius: "6px",
              padding: "4px 10px",
              cursor: "pointer",
              color: "#222",
              fontWeight: "600",
            }}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <div
            style={{
              color: "#ffbaba",
              background: "rgba(255, 0, 0, 0.15)",
              padding: "6px",
              borderRadius: "8px",
              marginBottom: "10px",
              fontWeight: "500",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.83), rgba(86, 83, 83, 0.06))",
            border: "none",
            borderRadius: "12px",
            color: "#000000ff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))")
          }
        >
          Sign Up
        </button>

        <p style={{ marginTop: "20px", color: "#eee", textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#fff",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
