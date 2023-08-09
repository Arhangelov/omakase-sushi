import { useContext, useEffect, useState } from 'react';
import { Context } from "../../store/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import { registerService } from '../../services/userAuthService';
import { Toaster } from "react-hot-toast";
import { toastErrorHandler } from '../../utils/toastErrorHandling';

const Register = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        address: "",
    });
    useEffect(() => {
        if (user.username) navigate("/");
    }, [navigate, user.username])

    const { email, username, password, confirmPassword, address } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Password do not match");
        } else {
            const newUser = {
                email,
                username,
                password,
                confirmPassword,
                address
            };

            registerService(newUser)
                .then(response => {
                    if (response.errors) {
                        const errMsg = response.errors.map(err => err.msg);
                        throw new Error(errMsg);
                    }
                    setUser({ email: response.newUserDTO.email, username: response.newUserDTO.username, address: response.newUserDTO.address });
                    const currentUserStringify = JSON.stringify({ email: response.newUserDTO.email, username: response.newUserDTO.username, address: response.newUserDTO.address });
                    localStorage.setItem('user', currentUserStringify);
                    localStorage.setItem('userToken', response.token);
                    navigate("/");
                }).catch(err => {
                    toastErrorHandler(err);
                });
        }
    }

    return (
        <>
            <Toaster />
            <h1>Sign Up</h1>
            <p>Create Your Account.</p>
            <form onSubmit={(e) => onSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input onChange={onChange} type="email" name="email" />

                <label htmlFor="username">Username</label>
                <input onChange={onChange} type="text" name="username" />

                <label htmlFor="password">Password</label>
                <input onChange={onChange} type="password" name="password" />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input onChange={onChange} type="password" name="confirmPassword" />

                <label htmlFor="address">Address</label>
                <input onChange={onChange} type="text" name="address" />

                <input onChange={onChange} type="submit" value="Register" />
            </form>
            <p>
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    )
}

export default Register