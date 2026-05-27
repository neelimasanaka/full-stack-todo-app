import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", response.data.token);
      navigate("/todos", { replace: true });
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="field-group">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="field-group">
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          {errors.api && <p className="error-text">{errors.api}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="auth-link-text">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       localStorage.setItem("token", response.data.token);
//       navigate("/todos");
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-container">
//         <h2>Login</h2>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError("");
//             }}
//           />

//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setError("");
//               }}
//             />

//             <span
//               className="eye-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </span>
//           </div>

//           {error && <p className="error-text">{error}</p>}

//           <button type="submit">Login</button>
//         </form>

//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;