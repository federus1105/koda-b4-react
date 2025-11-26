import { useState } from "react";

// --- email ---
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  if (!email.trim()) return "Email tidak boleh kosong";
  if (!emailRegex.test(email)) return "Format email tidak valid";
  return "";
};

// --- password ---
export const validatePassword = (password) => {
  const smallRegex = /[a-z]/;
  const bigRegex = /[A-Z]/;
  const specialRegex = /[!@#$%^&*/><]/;

  if (!password.trim()) return "Password tidak boleh kosong";
  if (password.length < 8) return "Password minimal 8 karakter";
  if (!smallRegex.test(password)) return "Password harus mengandung huruf kecil";
  if (!bigRegex.test(password)) return "Password harus mengandung huruf besar";
  if (!specialRegex.test(password))
    return "Password harus mengandung karakter spesial (!@#$%^&*)";
  return "";
};

// --- confirmpassword ---
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword.trim()) return "Konfirmasi password tidak boleh kosong";
  if (password !== confirmPassword)
    return "Konfirmasi password tidak sama dengan password";
  return "";
};

// --- fullname ----
export const validateFullname = (fullname) => {
  if (!fullname.trim()) return "Fullname tidak boleh kosong";
  if (fullname.length < 5) return "Fullname minimal 5 karakter";
  if (fullname.length > 20) return "Fullname maksimal 20 karakter";
  return "";
};

// --- token ---
export const validateToken = (token) => {
  if (!token || !token.trim()) return "OTP harus diisi";
  return "";
};



// --- HOOK REGISTER --
export function useRegister() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {
      fullname: validateFullname(formData.fullname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };
  return { formData, errors, handleChange, validate, setFormData };
}

// --- HOOK FORGOT ---
export function useForgot() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = { email: validateEmail(formData.email) };
    setErrors(newErrors);
    return !newErrors.email;
  };

  return { formData, errors, handleChange, validate, setFormData };
}

// --- HOOK RESET PASSWORD ---
export function useResetPassword() {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {
      token: validateToken(formData.token),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  return { formData, errors, handleChange, validate, setFormData };
}

// --- HOOK LOGIN ---
export function useLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const validate = () => {
      const newErrors = {
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
      };
  
      setErrors(newErrors);
      return !Object.values(newErrors).some((err) => err);
    };
  
    return { formData, errors, handleChange, validate, setFormData };
  };


// --- VALIDATION PROFILE ---
export const ProfileValidation = (value, oldValue, type) => {
  if (value === oldValue) return true;
    if (!value.trim()) return true;

  if (!value.trim()) return "";

  switch (type) {
    case "fullname":
      return validateFullname(value) || true;
    case "email":
      return validateEmail(value)|| true ;
    case "phone":
      if (!/^[0-9]+$/.test(value)) return "Phone harus angka";
      if (value.length < 10) return "Minimal 10 digit";
      if (value.length > 13) return "Maksimal 13 digit";
      return true;
    case "address":
      if (value.length > 50) return "Alamat maksimal 50 karakter";
      return true;
    default:
      return true;
  }
};
