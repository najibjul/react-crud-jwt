import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, set_password_confirmation] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

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
      <div className="flex justify-center items-center bg-base-200 h-screen">
        <div>
          <div className="card bg-base-100 w-96 shadow-xl pb-6">
            <form onSubmit={registrationPost}>
              <div className="card-body">
                <div className="place-items-center mb-6">
                  <h2 className="card-title text-3xl text-primary">REGISTRATION</h2>
                </div>
                <label htmlFor="name">Name</label>
                <input id="name" autoComplete="off" type="text" placeholder="Type name here" className={`input input-bordered w-full max-w-xs ${errors.name && 'input-error'}`} />
                <ErrorMessage message={errors.name} />

                <label htmlFor="email">Email</label>
                <input id="email" autoComplete="off" type="email" placeholder="Type email here" className={`input input-bordered w-full max-w-xs ${errors.email && 'input-error'}`} />
                <ErrorMessage message={errors.email} />

                <label htmlFor="password">Password</label>
                <input id="password" autoComplete="off" type="password" placeholder="Type password here" className={`input input-bordered w-full max-w-xs ${errors.password && 'input-error'}`} />
                <ErrorMessage message={errors.password} />

                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input id="password_confirmation" autoComplete="off" type="password" placeholder="Type password confirmation here" className={`input input-bordered w-full max-w-xs ${errors.password_confirmation && 'input-error'}`} />
                <ErrorMessage message={errors.password_confirmation} />
                
                <button disabled={loading && 'disabled'} type="submit" className={`btn btn-primary w-full mt-3 ${loading && 'btn-active'}`}>{loading ? 'Loading...' : 'Registration'}</button>
              </div>
            </form>
          <div className="place-items-center -mt-5">
            <div>
              <Link className="underline underline-offset-2 text-primary hover:text-purple-900" to={'/'}>Login</Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
