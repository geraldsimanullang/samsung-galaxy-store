import { useNavigate } from "react-router-dom";


export default function Navbar() {
  
  const navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate("/login")
  }
  
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">Content Management System</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Add Product</a>
            </li>
            {localStorage.getItem("role") === "Admin" && 
            <li>
              <a>Add User</a>
            </li>
            }
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-error" onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
}
