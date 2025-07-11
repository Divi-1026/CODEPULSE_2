
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">👤 Profile</h1>
        <p className="text-lg font-medium text-gray-700 mb-6">
          Welcome, <span className="text-blue-600">Divya </span>!
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
