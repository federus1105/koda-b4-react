import { useState } from "react";

export default function useAuth(mode = "register") {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    token: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  const smallRegex = /[a-z]/;
  const bigRegex = /[A-Z]/;
  const specialRegex = /[!@#$%^&*/><]/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    // --- FULLNAME ---
    if (mode === "register" && "fullname" in formData) {
      if (!formData.fullname.trim()) {
        newErrors.fullname = "Fullname tidak boleh kosong";
        valid = false;
      } else if (formData.fullname.length < 5) {
        newErrors.fullname = "Fullname minimal 5 karakter";
        valid = false;
      } else if (formData.fullname.length > 20) {
        newErrors.fullname = "Fullname maksimal 20 karakter";
        valid = false;
      }
    }

    // --- PASSWORD ---
    if ("password" in formData && (mode === "register" || mode === "login" || mode === "reset")) {
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
        newErrors.password =
          "Password harus mengandung karakter spesial (!@#$%^&*)";
        valid = false;
      }
    }

      // --- EMAIL ---
    if ("email" in formData) {
      if (!formData.email.trim()) {
        newErrors.email = "Email tidak boleh kosong";
        valid = false;
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Format email tidak valid";
        valid = false;
      }
    }

    // --- CONFIRM PASSWORD ---
    if ("confirmPassword" in formData) {
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Konfirmasi password tidak boleh kosong";
        valid = false;
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword =
          "Konfirmasi password tidak sama dengan password";
        valid = false;
      }
    }

    // --- OTP ----
  if ("token" in formData) {
    if (!formData.token || !formData.token.trim()) {
      newErrors.token = "OTP harus diisi";
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
