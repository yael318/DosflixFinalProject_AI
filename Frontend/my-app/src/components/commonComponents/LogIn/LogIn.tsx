// import React, { useState, useEffect } from 'react';
// import './LogIn.scss';
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../../redux/authSlice';

// export function LogIn() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const savedEmail = localStorage.getItem('savedEmail');
//         const savedPassword = localStorage.getItem('savedPassword');
//         const remember = localStorage.getItem('rememberMe') === 'true';

//         if (remember && savedEmail && savedPassword) {
//             setEmail(savedEmail);
//             setPassword(savedPassword);
//             setRememberMe(true);
//         }
//     }, []);

//     const handleLoginSuccess = ({ token, username, role }: any) => {
//         localStorage.setItem('token', token);
//         dispatch(loginUser({ token, role, username }));

//         if (rememberMe) {
//             localStorage.setItem('savedEmail', email);
//             localStorage.setItem('savedPassword', password);
//             localStorage.setItem('rememberMe', 'true');
//         } else {
//             localStorage.removeItem('savedEmail');
//             localStorage.removeItem('savedPassword');
//             localStorage.setItem('rememberMe', 'false');
//         }

//         if (role === 0) navigate('/admin');
//         else if (role === 1) navigate('/manager');
//         else navigate('/user');
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         if (!email || !password) {
//             setError('Both fields are required');
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post('https://localhost:7229/DosFlix/Users/login', {
//                 email,
//                 password,
//             });
//             handleLoginSuccess(response.data);
//         } catch (error) {
//             setError('Invalid email or password');
//             console.error(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const login = useGoogleLogin({
//         onSuccess: async (tokenResponse) => {
//             try {
//                 const response = await axios.post('https://localhost:7229/DosFlix/auth/google-login', {
//                     accessToken: tokenResponse.access_token,
//                 });

//                 handleLoginSuccess(response.data);
//             } catch (err) {
//                 console.error('Failed to login with Google:', err);
//                 setError('Google login failed');
//             }
//         },
//         onError: () => {
//             setError('Google login failed');
//         },
//     });

//     return (
//         <div className="login-page">
//             <div className="login-container">
//                 <img
//                     className="logo"
//                     src="https://ayeletginzburg.com/wp-content/uploads/2024/05/אייקון-פלאי-גדול-חלול-1024x1024.png"
//                     alt="Logo"
//                 />
//                 <h2>Sign in to your account</h2>
//                 <p className="sub-text">
//                     Not a member?{' '}
//                     <span onClick={() => navigate('/signup')} className="link">
//                         Start a 14 day free trial
//                     </span>
//                 </p>
//                 <form onSubmit={handleSubmit}>
//                     {error && <p className="error">{error}</p>}

//                     <label>Email address</label>
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
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />

//                     <div className="options">
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={rememberMe}
//                                 onChange={() => setRememberMe(!rememberMe)}
//                             />{' '}
//                             Remember me
//                         </label>
//                         <a href="#">Forgot password?</a>
//                     </div>

//                     <button type="submit" className="sign-in-button" disabled={isLoading}>
//                         {isLoading ? 'Signing in...' : 'Sign in'}
//                     </button>
//                 </form>

//                 <div className="divider">
//                     <span>Or continue with</span>
//                 </div>

//                 <div className="social-buttons">
//                     <button className="google-btn" onClick={() => login()}>
//                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
//                         Google
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import './LogIn.scss';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export function LogIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        const remember = localStorage.getItem('rememberMe') === 'true';

        if (remember && savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLoginSuccess = ({ token, username, role }: any) => {
        console.log('good')
        console.log('המשתמש שהתחבר:', username);
    console.log('תפקיד המשתמש:', role);
        localStorage.setItem('token', token);
        dispatch(loginUser({ token, role, username }));
  
        if (rememberMe) {
            localStorage.setItem('savedEmail', email);
            localStorage.setItem('savedPassword', password);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
            localStorage.setItem('rememberMe', 'false');
        }

navigate('/');

    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Both fields are required');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://localhost:7229/DosFlix/Users/login', {
                email,
                password
            });
                console.log('response.data:', response.data); // 🟡 הוספת השורה הזאת

            handleLoginSuccess(response.data);
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axios.post('https://localhost:7229/DosFlix/auth/google-login', {
                    accessToken: tokenResponse.access_token,
                });
                handleLoginSuccess(response.data);
            } catch {
                setError('Google login failed');
            }
        },
        onError: () => setError('Google login failed'),
    });

    return (
        <div className="login-page">
            <div className="login-container">
                <img
                    className="logo"
                    src="https://ayeletginzburg.com/wp-content/uploads/2024/05/אייקון-פלאי-גדול-חלול-1024x1024.png"
                    alt="Logo"
                />
                <h2>Sign in to your account</h2>
              <p className="sub-text">
    Not a member?{' '}
    <Link to="/signup" className="link">
        Start a 14 day free trial
    </Link>
</p>

                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}

                    <label>Email address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="options">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="sign-in-button" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="divider"><span>Or continue with</span></div>

                <div className="social-buttons">
                    <button className="google-btn" onClick={() => login()}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}
