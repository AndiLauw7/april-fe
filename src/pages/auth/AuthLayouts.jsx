/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context/AuthContext";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bakground from "../../assets/backgroud-depan.webp";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
const AuthLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === "/register";
  const switchForm = () => {
    if (isRegister) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bakground})` }}
      >
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-white/50">
          <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0_2px_#3b82f6]">
            SMPN 1 KEMIRI
            <br />
            KAB TANGERANG
          </h2>
          {isRegister ? (
            <FormRegister switchForm={switchForm} />
          ) : (
            <FormLogin switchForm={switchForm} />
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthLayouts;
