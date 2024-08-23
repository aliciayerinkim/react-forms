import { useState } from 'react'

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick() {
        try {
          const response = await fetch(
            "https://fsa-jwt-practice.herokuapp.com/authenticate",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
    
          if (response.ok) {
            setSuccessMessage(result.message);
            setUsername(result.data.username);
          } else {
            setError(result.error);
          }
        } catch (error) {
          setError(error.message);
        }
    }

    return (
        <div className='auth-container'>
            <h2>Authenticate!</h2>
            {successMessage && <p>{successMessage}</p>}
            {username && <p>Welcome, {username}!</p>}
            {error && <p>{error}</p>}
            <button className='button'onClick={handleClick}>Authenticate Token!</button>
        </div>
    );
}