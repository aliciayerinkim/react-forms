import { useState } from 'react'

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState("");

    function validateForm() {
        if (username.length < 8) {
            setValidationError("Username must be at least 8 characters long.");
            return false;
        }
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result);
                setToken(result.token);
                setValidationError("");
            } else {
                setError(result.error);
            }
        } 
        catch (error) {
          setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            {validationError && <p className='invalid-input'>{validationError}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password: <input value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className='button'>Submit</button>
            </form>
        </>
    ); 
}