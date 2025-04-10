import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import GoogleButton from "../auth/GoogleButton";

function RegisterForm() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Update form data
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Special case for confirm password - check match after state update
    if (name === "confirmPassword" || name === "password") {
      // For password field, check against current confirmPassword
      // For confirmPassword field, check against current password
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      // Only validate if confirmPassword has a value
      if (confirmPassword) {
        if (password !== confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "",
          }));
        }
      }
    }

    // Validate the field using Constraint API's validity property
    validateField(e);
  };

  const validateField = (e) => {
    const { name, validity } = e.target;
    let message = "";

    // Check validity states and set appropriate messages
    if (name === "email") {
      if (validity.valueMissing) {
        message = "Email is required";
      } else if (validity.typeMismatch) {
        message = "Please enter a valid email address";
      }
    } else if (name === "password") {
      if (validity.valueMissing) {
        message = "Password is required";
      } else if (validity.tooShort) {
        message = "Password must be at least 8 characters";
      }
    } else if (name === "confirmPassword") {
      if (validity.valueMissing) {
        message = "Please confirm your password";
      }
      // Password matching is handled in handleChange
    } else if (name === "username") {
      if (validity.valueMissing) {
        message = "Please enter a username";
      } else if (validity.tooShort) {
        message = "Username must be at least 5 characters long";
      }
    }

    // Update error state if there's a message
    if (message) {
      setErrors((prev) => ({
        ...prev,
        [name]: message,
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    let isValid = true;
    const newErrors = { ...errors };

    // Check each input's validity
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];

      // Only validate inputs with name attribute
      if (element.name) {
        // Check validity
        if (!element.validity.valid) {
          isValid = false;

          // Set appropriate error message based on validity state
          if (element.name === "email") {
            if (element.validity.valueMissing) {
              newErrors.email = "Email is required";
            } else if (element.validity.typeMismatch) {
              newErrors.email = "Please enter a valid email address";
            }
          } else if (element.name === "username") {
            if (element.validity.valueMissing) {
              newErrors.username = "Please enter a username";
            } else if (element.validity.tooShort) {
              newErrors.username =
                "Username must be at least 5 characters long";
            }
          } else if (element.name === "password") {
            if (element.validity.valueMissing) {
              newErrors.password = "Password is required";
            } else if (element.validity.tooShort) {
              newErrors.password = "Password must be at least 8 characters";
            }
          } else if (element.name === "confirmPassword") {
            if (element.validity.valueMissing) {
              newErrors.confirmPassword = "Please confirm your password";
            }
          }
        }
      }
    }

    // Check if passwords match
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      isValid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Update errors state
    setErrors(newErrors);

    // If the form is valid
    if (!isValid) {
      setIsPending(false);
      return;
    }

    // api call
    setIsPending(true);
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setIsPending(false);
    if (response.ok) {
      // alert(data.msg);
      console.log(data.user);
      navigate("/login");
    } else {
      setErrors((prevErrors) => {
        const newErrors = data.errors.reduce((acc, error) => {
          const { path, msg } = error;
          if (acc.hasOwnProperty(path)) {
            acc[path] = msg;
          }
          return acc;
        }, {});
        return newErrors;
      });
    }
  };

  const handleGoogleRegister = () => {
    // Implement Google registration logic here
    console.log("Google registration clicked");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://placehold.co/80x80/0066ff/FFFFFF?text=ID"
            alt="IdeaDrip Logo"
            className="w-16 h-16 mb-2 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-900">IdeaDrip</h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Create an account
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateField}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="name@company.com"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={validateField}
              className={`w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="john doe"
              minLength={5}
              required
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validateField}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                placeholder="••••••••"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={validateField}
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            {isPending ? (
              <ImSpinner className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleButton onClick={handleGoogleRegister} />
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
