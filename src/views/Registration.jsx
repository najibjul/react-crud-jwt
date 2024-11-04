import axios from "axios"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Registration() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, set_password_confirmation] = useState('')
    
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const  nameRef = useRef(null)
    const  emailRef = useRef(null)
    const  passwordRef = useRef(null)
    const  password_confirmationRef = useRef(null)

    const registrationPost = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', password_confirmation)

        try {
            await axios.post('http://localhost:8000/api/registration', formData)
            .then((response) => {
                sessionStorage.setItem('successMessage', response.data.message)
                navigate('/')
            })

        } catch (error) {
            setErrors(error.response.data)

            if (error.response.data.name) {
                nameRef.current.focus()
                
            } else if (error.response.data.email) {
                emailRef.current.focus()

            } else if (error.response.data.password) {
                passwordRef.current.focus()
                
            } else if (error.response.data.password_confirmation) {
                password_confirmationRef.current.focus()

            }
            
            
        }
    }
    
    return (
        <>
            <div className="container" style={{ marginTop : '100px' , marginBottom : '100px' }}>
                <div className="row">
                    <div className="col-0 col-md-2 col-lg-4"></div>
                    <div className="col-12 col-md-8 col-lg-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <h3>Registration</h3>
                            </div>
                            <form onSubmit={registrationPost}>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input onChange={(e) => setName(e.target.value)} type="text" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} autoFocus placeholder="Type name here..." ref={nameRef} />
                                        {
                                            errors.name && (
                                                <div className="alert alert-danger mt-2">
                                                    {errors.name[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Type email here..." ref={emailRef} />
                                        {
                                            errors.email && (
                                                <div className="alert alert-danger mt-2">
                                                    {errors.email[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Type password here..." ref={passwordRef} />
                                        {
                                            errors.password && (
                                                <div className="alert alert-danger mt-2">
                                                    {errors.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="confPassword">Password Confirmation</label>
                                        <input onChange={(e) => set_password_confirmation(e.target.value)} type="password" id="confPassword" className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`} placeholder="Type password confirmation here..." ref={password_confirmationRef}/>
                                        {
                                            errors.password_confirmation && (
                                                <div className="alert alert-danger mt-2">
                                                    {errors.password_confirmation[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Save</button>
                                    <div className="text-center mt-4">
                                        <Link to={'/'} >Back to Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration