import { useState } from "react";

export default function UserForm({ handleSubmit, formType }) {
    const [user, setUser] = useState({ username: '', password: '' });

    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit(user);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    return (
        <form onSubmit={handleSubmitDecorator}>
            {formType === "register" ? <h1>Register</h1> : <h1>Login</h1>}
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}