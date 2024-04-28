import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    navigate("/login");
  }
  return (
    <>
      <nav
        className="col-md-3 col-lg-2 d-md-block sidebar collapse bg-white"
        id="sidebar-menu"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" id="nav-product" to="/">
                <span className="icon material-symbols-outlined me-2">
                  post
                </span>
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="nav-category" to="/category">
                <span className="icon material-symbols-outlined me-2">
                  category
                </span>
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="nav-category" to="/register">
                <span className="icon material-symbols-outlined me-2">
                  account_circle
                </span>
                Add User
              </Link>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Account</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link">
                <span className="icon material-symbols-outlined me-2">
                  person
                </span>
                Hei, <span id="username">{localStorage.email}</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="nav-logout" onClick={handleLogout}>
                <span className="icon material-symbols-outlined me-2">
                  logout
                </span>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
