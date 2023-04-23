import { useContext, useState } from 'react';
import { Context } from "../../store/UserContext";
import { useNavigate } from 'react-router-dom';

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

    if (user.username) navigate("/");

    const { email, username, password, confirmPassword, address } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(email, username, password, confirmPassword, address);

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

            fetch("https://omakase-sushi-api.vercel.app/auth/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
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
                });
        }
    }

    return (
        <>
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
        </>
    )
}

export default Register