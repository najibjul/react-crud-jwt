import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link,  useNavigate } from "react-router-dom"
import SuccessAlert from "./components/SuccessAlert"

function Login() {
    const [email, setEmail] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const  emailRef = useRef(null)
    const  passwordRef = useRef(null)

    useEffect(() => {
        
        const sessionSuccess = sessionStorage.getItem('successMessage')

        if(sessionSuccess){            
            setSuccessMessage(sessionSuccess)
            sessionStorage.removeItem('successMessage')
        }
    })
    
    const loginPost = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('email', email)
        formData.append('password', password)

        try {
            await axios.post('http://127.0.0.1:8000/api/login', formData)
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                navigate('/posts')
            })
        } catch (error) {
            const err = error.response.data            
            
            setErrors(err)

            if (err.email) {
                emailRef.current.focus()
            } else if (err.password) {
                passwordRef.current.focus()
            } else if (err.error) {
                emailRef.current.focus()
                setEmail('')
                setPassword('')
            }
        }
        
    }

    return (
        <div className="container" style={{ marginTop : '100px' }}>
            <div className="row">
                <div className="col-0 col-md-2 col-lg-4"></div>
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow">
                        <div className="card-header">
                            <h3>Welcome</h3>
                        </div>
                        <form onSubmit={loginPost}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoFocus placeholder="your.mail@example.com" ref={emailRef} value={email} />
                                    {
                                        errors.email && (
                                            <div className="alert alert-danger mt-2">{errors.email[0]}</div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className={`form-control ${errors.password ?  'is-invalid'  : ''}`} placeholder="•••••••" ref={passwordRef} value={password} />
                                    {
                                        errors.password && (
                                            <div className="alert alert-danger mt-2">{errors.password[0]}</div>
                                        )
                                    }
                                    {
                                        errors.error && (
                                            <div className="alert alert-danger mt-2">{errors.error}</div>
                                        )
                                    }
                                </div>


                                <SuccessAlert message={successMessage} />

                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <Link to={'/registration'} className="btn btn-success">Registration</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login