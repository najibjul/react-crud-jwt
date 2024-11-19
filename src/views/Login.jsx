import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessAlert from "./components/SuccessAlert";
import ErrorAlert from "./components/ErrorAlert";
import ErrorMessage from "./components/ErrorMessage";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

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
      <div className="flex justify-center items-center bg-base-200 h-screen">
        <div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <form onSubmit={loginPost}>
              <div className="card-body">
                <div className="place-items-center mb-6">
                  <h2 className="card-title text-3xl text-primary">LOGIN</h2>
                </div>
                <label htmlFor="email" className={`input input-bordered flex items-center gap-2 ${errors.email && 'input-error'}`}>
                  <FontAwesomeIcon icon={faEnvelope} className={`mr-3 ${errors.email ? 'text-red-800' : 'text-primary'}`} />
                  <input id="email" type="email" autoComplete="on" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <ErrorMessage message={errors.email} />
                <label htmlFor="password" className={`input input-bordered flex items-center gap-2 ${errors.password && 'input-error'}`}>
                  <FontAwesomeIcon icon={faLock} className={`mr-3 ${errors.password ? 'text-red-800' : 'text-primary'}`} />
                  <input id="password" type="password" autoComplete="off" className="grow" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                <ErrorMessage message={errors.email} />
                <ErrorAlert message={errors.error} />
                <SuccessAlert message={successMessage} />
                <button disabled={loading && 'disabled'} type="submit" className={`btn btn-primary w-full mt-3 ${loading && 'btn-active'}`}>{loading ? 'Loading...' : 'Login'}</button>
              </div>
            </form>
          </div>
          <div className="place-items-center">
            <p className="mt-3">Don't have an account? klik <Link className="underline underline-offset-2 text-primary hover:text-purple-900" to={'/registration'}>here</Link> to registration</p>
          </div>
        </div>
      </div>
    </>
  );
}