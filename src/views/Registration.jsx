import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessage from "./components/ErrorMessage";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, set_password_confirmation] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password_confirmationRef = useRef(null);

  const registrationPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);

    try {
      setLoading(true);
      await axios
        .post("http://localhost:8000/api/registration", formData)
        .then((response) => {
          sessionStorage.setItem("successMessage", response.data.message);
          navigate("/");
        });
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-100 ">
        <div className="p-5 bg-white xl:w-1/4 lg:1/3 md:w-1/2 rounded-lg">
          <p className="font-sans xl:text-4xl text-3xl font-semibold justify-self-center text-blue-800">
            REGISTRATION
          </p>
          <hr className="my-5" />
          <form onSubmit={registrationPost}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="lg:text-lg md:text-md text-blue-800"
              >
                Name
              </label>
              <input
                type="text"
                ref={nameRef}
                className={`block w-full border ${
                  errors.name
                    ? "border-red-300 ring-1 ring-red-500"
                    : "border-gray-300"
                }  p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 hover:border-blue-400 hover:ring-1 transition mt-2`}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name here"
              />
              <ErrorMessage message={errors.name && errors.name[0]} />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="lg:text-lg md:text-md text-blue-800"
              >
                Email
              </label>
              <input
                type="email"
                ref={emailRef}
                className={`block w-full border ${
                  errors.email
                    ? "border-red-300 ring-1 ring-red-500"
                    : "border-gray-300"
                }  p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 hover:border-blue-400 transition mt-2`}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
              />
              <ErrorMessage message={errors.email && errors.email[0]} />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="lg:text-lg md:text-md text-blue-800"
              >
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                className={`block w-full border ${
                  errors.password
                    ? "border-red-300 ring-1 ring-red-500"
                    : "border-gray-300"
                }  p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 hover:border-blue-400 transition mt-2`}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password here"
              />
              <ErrorMessage message={errors.password && errors.password[0]} />
            </div>
            <div className="mb-10">
              <label
                htmlFor="passwordConfirmation"
                className="lg:text-lg md:text-md text-blue-800"
              >
                Confirmation Password
              </label>
              <input
                type="password"
                ref={password_confirmationRef}
                className={`block w-full border ${
                  errors.password_confirmation
                    ? "border-red-300 ring-1 ring-red-500"
                    : "border-gray-300"
                }  p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 hover:border-blue-400 transition mt-2`}
                onChange={(e) => set_password_confirmation(e.target.value)}
                placeholder="Enter your confirmation password here"
              />
              <ErrorMessage
                message={
                  errors.password_confirmation &&
                  errors.password_confirmation[0]
                }
              />
            </div>

            <button
              disabled={loading && "disabled"}
              type="submit"
              className={`block w-full bg-blue-800 rounded-lg p-3 text-white hover:bg-blue-900 transition  ${
                loading && "disabled:opacity-75"
              }`}
            >
              {loading ? "LOADING..." : "REGISTRATION"}
            </button>
          </form>

          <p className="mt-5 mb-5 justify-self-center">
            <Link
              to={"/"}
              className="text-blue-800 underline underline-offset-5 hover:text-blue-950"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registration;
