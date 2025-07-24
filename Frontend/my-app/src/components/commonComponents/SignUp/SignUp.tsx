// import React, { useState } from 'react';
// // import './SignUp.scss';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../../redux/authSlice';

// export function SignUp() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setError('');

//         if (!username || !email || !password) {
//             setError('All fields are required');
//             return;
//         }

//         try {
//             const response = await axios.post('https://localhost:7229/DosFlix/Users/register', {
//                 username,
//                 email,
//                 password,
//             });

//             const { token, username: name, role } = response.data;
//             localStorage.setItem('token', token);
//             dispatch(loginUser({ token, role, username: name }));

//             navigate(role === 0 ? '/admin' : role === 1 ? '/manager' : '/user');
//         } catch (err: any) {
//             setError(err.response?.data || 'Registration failed');
//         }
//     };

//     return (
//         <div className="signup-page">
//             <div className="signup-container">
//                 <h2>Create your account</h2>
//                 <form onSubmit={handleSubmit}>
//                     {error && <p className="error">{error}</p>}

//                     <label>Username</label>
//                     <input
//                         type="text"
//                         placeholder="Enter a username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />

//                     <label>Email</label>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />

//                     <label>Password</label>
//                     <input
//                         type="password"
//                         placeholder="Enter a password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />

//                     <button type="submit" className="sign-up-button">Sign up</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/authSlice";
import "./SignUp.scss";
import Camera from "../../userComponents/Camera/Camera";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(true); // true = male
  const [ageGroup, setAgeGroup] = useState<number | null>(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setError('');

//         try {
//             // const response = await axios.post('https://localhost:7229/DosFlix/Users/register', {
//             //     request: {
//             //         username,
//             //         email,
//             //         password,
//             //         phone,
//             //         gender,
//             //         ageGroup,
//             //         profilePicture: null
//             //     }
//             // });
//             const response = await axios.post('https://localhost:7229/DosFlix/Users/register', {
//   username,
//   email,
//   password,
//   phone,
//   gender,
//   ageGroup,
//   profilePicture: null
// });


//             const { token, username: name, role } = response.data;
//             localStorage.setItem('token', token);
//             dispatch(loginUser({ token, role, username: name }));

//              navigate(role === 0 ? '/admin' : role === 1 ? '/manager' : '/user');
//             // navigate('/');
//         } catch (err: any) {
//             setError(err.response?.data || 'Registration failed');
//         }
//     };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('https://localhost:7229/DosFlix/Users/register', {
            username,
            email,
            password,
            phone,
            gender,
            ageGroup,
            profilePicture: null
        });

        // אחרי הרשמה מוצלחת, פשוט להפנות לדף ההתחברות:
        navigate('/login');
    } catch (err: any) {
        setError(err.response?.data || 'Registration failed');
    }
};


  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="error">
              {typeof error === "string" ? error : "Registration failed"}
            </p>
          )}

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Camera></Camera>

          {/* //<label>Gender</label>
          //</form><select
           // value={gender ? "male" : "female"}
           // onChange={(e) => setGender(e.target.value === "male")}
          //</form>>
            //<option value="male">Male</option>
           // <option value="female">Female</option>
         // </select> */}

          <label>Age Group</label>
          <select
            value={ageGroup ?? ""}
            onChange={(e) =>
              setAgeGroup(e.target.value ? +e.target.value : null)
            }
          >
            <option value="">Select Age Group</option>
            <option value="1">Under 18</option>
            <option value="2">18–30</option>
            <option value="3">31–50</option>
            <option value="4">51+</option>
          </select>

          <button type="submit" className="sign-up-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
