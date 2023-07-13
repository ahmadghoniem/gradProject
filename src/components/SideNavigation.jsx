// import { li } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="py-8 px-4 bg-white rounded-r-3xl">
      <ul className="flex flex-col gap-8 text-center">
        <li className="" to="/">
          <h1 className="font-sans text-indigo-600 text-8xl">UTM</h1>
          <span className="mt-2 text-2xl">Dashboard</span>
        </li>
        <li
          className="text-xl [&.active]:text-indigo-500 [&.active]:font-bold active"
          to="/"
        >
          Overview
        </li>
        <li className="text-xl [&.active]:text-violet-700" to="/Operation">
          Operation
        </li>
        <li className="text-xl [&.active]:text-violet-700" to="/Clients">
          Clients
        </li>
        <li className="text-xl [&.active]:text-violet-700" to="/Analytics">
          Analytics
        </li>
        <li className="text-xl [&.active]:text-violet-700" to="/About">
          About
        </li>
        <li className="text-xl [&.active]:text-violet-700" to="/Help">
          Help
          <small className="block mt-2 text-base text-left">
            First steps can sometimes be challenging,
            <br /> Don't worry! We're here to help.
          </small>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
