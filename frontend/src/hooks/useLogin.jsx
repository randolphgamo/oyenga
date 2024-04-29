import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {


  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();


  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      //update the auth context
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);

      // //navigate to the admin home page
      // navigate("/chant", { replace: true });

    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  //we return the function so we can use it from the hook through destructuring.
  return { login, isLoading, error };
};
