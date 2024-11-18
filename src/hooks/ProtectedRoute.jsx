import React, { useState, useEffect, useRef } from "react";

const ProtectedRoute = ({ children, password }) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(""); // To store error message
  const passwordInputRef = useRef(null); // To focus on the input field

  useEffect(() => {
    // Focus the input field when the modal is shown
    if (!isAuthenticated) {
      passwordInputRef.current.focus();
    }
  }, [isAuthenticated]);
  const handleSubmit = (e) => {
    e.preventDefault(); // Ensure the form does not reload the page
    if (inputPassword === password) {
      setIsAuthenticated(true);
      setError(""); // Clear error message on successful login
    } else {
      setError("Incorrect password");
      setInputPassword(""); // Reset password input field
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-600 bg-opacity-40 ">
      <div className="mt-5 flex place-content-center">
        <div className="bg-warning-50 p-10 space-y-2 rounded-md bg-white">
          <h2>Enter Password to Access This Page</h2>
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <input
              ref={passwordInputRef}
              className="border-2 border-yellow-600 p-2 rounded-lg"
              type="password"
              placeholder="Password"
              autoComplete="on"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="rounded-lg bg-green-400 p-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
