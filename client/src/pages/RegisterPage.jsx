import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert('Registration Success!');
        } catch (error) {
            alert('Registration failed. Please try again later');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={register}>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;