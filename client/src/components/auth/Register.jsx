import { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        full_name: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Check if username or email already exists
    const checkUsernameOrEmail = async (name, value) => {
        try {
            const response = await axios.post("http://localhost:5000/check-username-email", {
                [name]: value,
            });
            if (name === "username") {
                setUsernameTaken(response.data.usernameTaken);
            } else if (name === "email") {
                setEmailTaken(response.data.emailTaken);
            }
        } catch (error) {
            console.error("Error checking username/email", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "password") {
            setPasswordMatch(value === formData.confirmPassword);
            setIsPasswordValid(validatePassword(value));
        } else if (name === "confirmPassword") {
            setPasswordMatch(value === formData.password);
        }

        if (name === "username" || name === "email") {
            checkUsernameOrEmail(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordMatch && isPasswordValid && !usernameTaken && !emailTaken) {
            registerUser(formData);
        } else {
            console.log("Form is invalid or username/email is taken");
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/register", data);
            console.log(response.data);
        } catch (error) {
            console.error("Registration error", error);
        }
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="input-container">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {usernameTaken && <p style={{ color: "red" }}>Username is already taken!</p>}
                </div>

                {/* Email */}
                <div className="input-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {emailTaken && <p style={{ color: "red" }}>Email is already registered!</p>}
                </div>

                {/* Full Name */}
                <div className="input-container">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                </div>

                {/* Password */}
                <div className="input-container">
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? "🔒" : "🔓"}
                        </span>
                    </div>
                </div>

                {!isPasswordValid && (
                    <p style={{ color: "red" }}>
                        Password must be at least 8 characters long and contain at least one letter, one number, and one special character.
                    </p>
                )}

                {/* Confirm Password */}
                <div className="input-container">
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? "🔒" : "🔓"}
                        </span>
                    </div>
                </div>

                {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match!</p>}
                
                <button type="submit" className="register-btn" disabled={usernameTaken || emailTaken}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;