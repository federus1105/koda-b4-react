import { useState } from "react";

function useAuth(mode = "login", initialValues = { email: "", password: "", fullname:"", confirmPassword:"" }) {
  const [email, setEmail] = useState(initialValues.email);
  const [password, setPassword] = useState(initialValues.password);
  const [fullname, setFullname] = useState(initialValues.fullname);
  const [phone, setPhone] = useState(initialValues.phone);
  const [confirmPassword, setConfirmPassword] =  useState(initialValues.confirmPassword)

  const [errorConfirm, setErrorConfirm] = useState("")
  const [errorem, setErrorem] = useState("");
  const [errorpass, setErrorPass] = useState("");
  const [errorfullname, setErrorFullname] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // regex untuk email
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  const RegexKecil = /[a-z]/;
  const RegexBesar = /[A-Z]/;
  const Spesial = /[!@#$%^&*/><]/;

  const Validate = () => {
    let valid = true;

        // === Validasi khusus register ===
    if (mode === "register") {
      // Fullname
      if (fullname.trim().length <= 3) {
        setErrorFullname("Fullname minimal 3 karakter");
        valid = false;
      } else if (fullname.trim().length >= 20) {
        setErrorFullname("Fullname maksimal 20 karakter");
        valid = false;
      } else {
        setErrorFullname("");
      }

      // Confirm Password
      if (password !== confirmPassword) {
        setErrorConfirm("Password dan konfirmasi password harus sama");
        valid = false;
      } else {
        setErrorConfirm("");
      }
    }

    // Validasi Email
    if (email.trim() === ``) {
      setErrorem("Email tidak boleh kosong");
      valid = false;
    } else if (!re.test(email)) {
      setErrorem("Format Email salah");
      valid = false;
    } else {
      setErrorem("");
    }

    // Validasi Password
    if (password.trim() === ``) {
      setErrorPass("Password tidak boleh kosong");
      valid = false;
    } else if (password.length < 8) {
      setErrorPass("Minimal harus 8 karakter");
      valid = false;
    } else if (!RegexKecil.test(password)) {
      setErrorPass("Minimal harus ada huruf kecil");
      valid = false;
    }  else if (!Spesial.test(password)) {
        setErrorPass("Minimal harus ada karakter spesial")
        valid = false;
    }
    else {
      /* Jika input email benar tetapi password salah, input email tidak akan
  muncul di console harus kedua nya benar */
      setErrorem("");
      setErrorPass("");
    }
    return valid;
  };

  return {
    // Data
    email,
    setEmail,
    password,
    setPassword,
    fullname,
    setFullname,
    phone,
    setPhone,
    confirmPassword,
    setConfirmPassword,

    // Error
    errorem,
    setErrorem,
    errorpass,
    setErrorPass,
    errorfullname,
    setErrorFullname,
    errorConfirm,
    setErrorConfirm,
    alertMsg,
    setAlertMsg,

    // Method
    Validate,
  };
}

export default useAuth;