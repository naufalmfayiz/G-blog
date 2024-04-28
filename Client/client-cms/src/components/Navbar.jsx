export default function Navbar() {
  return (
    <>
      <header className="navbar sticky-top flex-md-nowrap p-0 bar" id="navbar">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 bar">
          <img
            src="https://cdn-icons-png.freepik.com/512/9956/9956310.png?ga=GA1.1.1392924088.1712049123&"
            width={30}
            className="d-inline-block me-2"
            alt="G-blog"
          />
          G-Blog
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </header>
    </>
  );
}
