import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <aside className="flex flex-col justify-center p-4">
      <h1>Dashboard</h1>
      <nav className="flex flex-col">
        <NavLink className="[&.active]:text-violet-700" to="/">
          Overview
        </NavLink>
        <NavLink className="[&.active]:text-violet-700" to="/Operation">
          Operation:Test
        </NavLink>
        <NavLink className="[&.active]:text-violet-700" to="/Clients">
          Clients
        </NavLink>{" "}
        {/**If logged in */}
        <NavLink className="[&.active]:text-violet-700" to="/Analytics">
          Analytics
        </NavLink>
        <NavLink className="[&.active]:text-violet-700" to="/About">
          About
        </NavLink>
      </nav>
      <div id="contactUs">
        first steps can be hard contact us if you are having a problem
      </div>
    </aside>
  );
};

export default SideNav;
