import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ redirectTo, children, requireAdmin = false }) {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  let role = null;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      role = decoded?.role;
    }
  } catch (err) {
    toast.error("Token tidak valid, silakan login kembali");
    navigate(redirectTo, { replace: true });
    console.error("Token tidak valid:", err);
  }
  useEffect(() => {
    if (!isLoggedIn || !token) {
      toast.error("Anda harus login dulu");
      navigate(redirectTo, { replace: true });
      return;
    }
    if (requireAdmin && role !== "admin") {
      toast.error("Akses ditolak! Halaman ini hanya untuk Admin");
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, token, role, navigate, redirectTo, requireAdmin]);

  if (!isLoggedIn || !token) return null;
  if (requireAdmin && role !== "admin") return null;

  return children;
}

export default PrivateRoute;
