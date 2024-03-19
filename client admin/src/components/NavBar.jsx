import { IoIosLogOut } from "react-icons/io";
import { useUserStore } from "../hooks/useUserStore";

export const NavBar = () => {

  const { startLogout } = useUserStore()

  const logout = () => {
    startLogout()
  }

  return (
    <div className="header">
      <div className="nav">
        <div className="titleNav">Eucalipt DL</div>
        <div className="logoutNav">
          <IoIosLogOut onClick={logout} color="red" size={20} />
        </div>
      </div>
    </div>
  );
};
