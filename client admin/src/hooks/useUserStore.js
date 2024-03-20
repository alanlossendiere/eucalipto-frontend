import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../store/adminSlice";
import { adminApi } from "../api/adminApi";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useUserStore = () => {
  const dispatch = useDispatch();

  const { authStatus, user, message } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        dispatch(onLogout());
        console.log("aca");
      }

      try {
        const res = await adminApi.get("/admin/verify", cookies.token);
        console.log(res);
        if (!res.data) {
          dispatch(onLogout());
          dispatch(onChecking());
          return;
        }
        dispatch(onLogin(res.data));
        navigate("/");
      } catch (error) {
        console.log(error);
        dispatch(onLogout());
      }
    };

    checkLogin();
  }, []);

  const startChecking = async () => {
    try {
      dispatch(onChecking());
    } catch (error) {
      console.log(error);
    }
  };

  const startLogin = async (formLogin) => {
    try {
      dispatch(onChecking());
      const { data } = await adminApi.post("/admin/login", formLogin);
      dispatch(onLogin(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const startLogout = async () => {
    try {
      dispatch(onChecking());
      await adminApi.post("/admin/logout");
      dispatch(onLogout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Propiedades

    authStatus,
    user,
    message,

    // Metodos

    startChecking,
    startLogin,
    startLogout,
  };
};
