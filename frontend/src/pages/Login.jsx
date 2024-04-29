import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle password visibility function
  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column justify-content-center align-items-center border-end bg-light">
        <img src="./singing.jpg" alt="login left image" className="h-50"/>
        <h4 className="text-center text-primary mt-5">Ajoute des chants et contribue à la joie dans le monde</h4>
      </div>

      <form
        className="d-flex flex-column flex-grow-1 justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <h3>Log in </h3>

        <div className="input-group w-50 mb-3">
          <span className="input-group-text">
            <i className="bi bi-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group w-50 mb-3">
          <span className="input-group-text">
            <i className="bi bi-lock"></i>
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"} // Controlled input
            className="form-control login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleTogglePassword} //update click handler
          >
            <i className={`bi bi-${isPasswordVisible ? "eye-fill" : "eye-slash-fill"}`}></i>
          </button>
        </div>

        <button disabled={isLoading} className="w-50">
          Log in
        </button>
        {/* if there is an error, output it here */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
