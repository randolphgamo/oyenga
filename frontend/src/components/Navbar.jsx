import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src="./file-music.svg" alt="oyenga brand icon" height="30" />
          <Link className="navbar-brand" to="/">
            Oyenga
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Acceuil
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Catégories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Avent
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Adoration
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Carême
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Autre
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-disabled="true" to="/search">
                  Liste Alphabétique des Chants
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
