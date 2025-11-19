import { useState } from "react";

function useAuth(mode = "register") {
  // Data
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

//   Error
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // Regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  const smallRegex = /[a-z]/;
  const bigRegex = /[A-Z]/;
  const specialRegex = /[!@#$%^&*/><]/;

  // Handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function Validation
  const validate = () => {
    let valid = true;
    const newErrors = {
      fullname: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    };

    // fullname
  if (mode === "register") {
    if (!formData.fullname.trim()) {
      newErrors.fullname = "fullname tidak boleh kosong";
      valid = false;
    } else if (formData.fullname.length < 5) {
      newErrors.fullname = "fullname minimal 5 karakter";
      valid = false;
    } else if (formData.fullname.length > 20) {
      newErrors.fullname = "fullname tidak boleh lebih dari 20 karakter";
      valid = false;
    }
  }

    // Email
  if (mode === "register") {
    if (!formData.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      valid = false;
    }
  }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = "Password tidak boleh kosong";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
      valid = false;
    } else if (!smallRegex.test(formData.password)) {
      newErrors.password = "Password harus mengandung huruf kecil";
      valid = false;
    } else if (!bigRegex.test(formData.password)) {
      newErrors.password = "Password harus mengandung huruf besar";
      valid = false;
    } else if (!specialRegex.test(formData.password)) {
      newErrors.password = "Password harus mengandung karakter spesial (!@#$%^&*)";
      valid = false;
    }

    // Confirm Password
    if (mode === "register") {
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Konfirmasi password tidak boleh kosong";
        valid = false;
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Konfirmasi password tidak sama dengan password";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    validate,
  };
}

export default useAuth;