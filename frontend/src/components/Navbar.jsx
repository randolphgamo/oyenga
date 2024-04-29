import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {


  const { user }  = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
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
                <Link className="nav-link" aria-current="page" to="/">
                  Acceuil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-disabled="true" to="/chants">
                  Chants
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  role="button"
                   to="/apropos"
                >
                  À propos
                </Link>
                
              </li>
              
            </ul>
            {!user && (<Link className="nav-link" style={{ color: "gray"}} aria-disabled="true" to="/login" >
            Admin
            </Link>
              
            )}
            
          </div>
          
          {user && (
          <>
            <span>{user.email}</span>
            
            <Link className="nav-link mx-2" aria-disabled="true" to="/add">
            Add Song
          </Link>
          
            <button
              className="btn btn-outline-primary me-2 logout"
              type="button"
              onClick={handleClick}
            >
              Logout
            </button>{" "}
          
        
           </> )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
