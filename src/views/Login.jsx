import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessAlert from "./components/SuccessAlert";
import ErrorAlert from "./components/ErrorAlert";
import ErrorMessage from "./components/ErrorMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const sessionSuccess = sessionStorage.getItem("successMessage");

    if (sessionSuccess) {
      setSuccessMessage(sessionSuccess);
      sessionStorage.removeItem("successMessage");
    }
  });

  const loginPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    try {
      setLoading(true);
      await axios
        .post("http://127.0.0.1:8000/api/login", formData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          navigate("/posts");
        });
    } catch (error) {
      const err = error.response.data;

      setErrors(err);

      if (err.error) {
        setEmail("");
        setPassword("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-100 px-5">
        <div className="p-5 bg-white xl:w-1/4 lg:1/3 md:w-1/2 rounded-lg">
          <p className="font-sans text-4xl font-semibold justify-self-center text-blue-800">
            LOGIN
          </p>
          <hr className="my-5" />
          <form onSubmit={loginPost}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="lg:text-lg md:text-md text-blue-800"
              >
                Email
              </label>
              <input
                type="email"
                ref={emailRef}
                value={email}
                className={`block w-full border ${
                  errors.email
                    ? "border-red-300 ring-1 ring-red-500"
                    : "border-gray-300"
                }  p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 hover:border-blue-400 hover:ring-1 transition mt-2 `}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
              />
              <ErrorMessage message={errors.email && errors.email[0]} />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="lg:text-lg md:text-md text-blue-800"
              >
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                value={password}
                className={`block w-full border ${
                  errors.password
                    ? "border-red-300 ring-1 ring-red-500"
                    : "border-gray-300"
                }  p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 hover:border-blue-400 transition mt-2`}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password here"
              />
              <ErrorMessage message={errors.password && errors.password[0]} />

              <SuccessAlert message={successMessage} />
              <ErrorAlert message={errors.error} />
            </div>

            <button
              disabled={loading && "disabled"}
              className={`block w-full bg-blue-800 rounded-lg p-3 text-white hover:bg-blue-900 transition ${
                loading && "disabled:opacity-75"
              }`}
            >
              {loading ? "LOADING..." : "LOGIN"}
            </button>
          </form>

          <p className="mt-5 mb-5 justify-self-center">
            Don't have account? Click{" "}
            <Link
              to={"/registration"}
              className="text-blue-800 underline underline-offset-5 hover:text-blue-950"
            >
              here
            </Link>{" "}
            to registration
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
