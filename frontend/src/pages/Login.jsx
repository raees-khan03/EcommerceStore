import axios from 'axios';
import { useContext, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [currentState, setCurrentState] = useState('login');
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const navigate=useNavigate()

  const {backendURL,setToken}=useContext(shopContext)

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      if(currentState==="signup"){
        // Validate passwords match
        if(password !== confirmPassword){
          toast.error("Passwords do not match")
          return
        }

        const res= await axios.post(backendURL+"/api/user/register",{name,email,password})
        
        if(res.data.success){
          localStorage.setItem("token",res.data.token)
          setToken(res.data.token)
          toast.success(res.data.message)
          // Reset form after successful signup
          setUsername('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setCurrentState('login')
        }
        else{
          toast.error(res.data.message)
        }
      }
      else{
        const res= await axios.post(backendURL+"/api/user/login",{email,password})
        if(res.data.success){
          localStorage.setItem("token",res.data.token)
          setToken(res.data.token)
          toast.success(res.data.message)
          // Reset form after successful login
          setEmail('')
          setPassword('')
          navigate("/")
        }
        else{
          toast.error(res.data.message)
        }
      }
    } catch (error) {
     
      toast.error(error.response?.data?.message || error.message || "An error occurred")
    }
  
}
    

  
 



  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-stone-50 via-white to-stone-50 flex items-center justify-center p-4">
      {/* Decorative background elements */}
     
      <div className="w-full max-w-md z-10  p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="prata-regular text-5xl text-stone-900 mb-2">
            {currentState === 'login' ? 'Login' : 'Sign Up'}
          </h1>
          <div className="w-16 h-1 bg-stone-900 mx-auto"></div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 border border-stone-200 py-4"
        >
          {/* Login Form */}
          {currentState === 'login' && (
            <div className="space-y-6 animate-fade-in">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 border-2 bg-white text-stone-900 placeholder-stone-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'email'
                      ? 'border-stone-900 shadow-md'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 border-2 bg-white text-stone-900 placeholder-stone-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'password'
                      ? 'border-stone-900 shadow-md'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                />
              </div>

              {/* Links */}
              <div className="flex justify-between items-center text-sm">
                <button
                  type="button"
                  className="text-stone-600 hover:text-stone-900 font-light transition-colors"
                >
                  Forgot your password?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentState('signup');
                    setEmail('');
                    setPassword('');
                  }}
                  className="text-stone-900 font-semibold hover:underline transition-all"
                >
                  Sign Up
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-3 font-light text-lg tracking-wider hover:bg-stone-800 active:scale-95 transition-all duration-200 uppercase letter-spacing"
              >
                Login
              </button>
            </div>
          )}

          {/* Sign Up Form */}
          {currentState === 'signup' && (
            <div className="space-y-5 animate-fade-in">
              {/* Username Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="GreatStack"
                  value={name}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 border-2 bg-white text-stone-900 placeholder-stone-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'name'
                      ? 'border-stone-900 shadow-md'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="user.greatstack@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 border-2 bg-white text-stone-900 placeholder-stone-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'email'
                      ? 'border-stone-900 shadow-md'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 border-2 bg-white text-stone-900 placeholder-stone-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'password'
                      ? 'border-stone-900 shadow-md'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 border-2 bg-white text-stone-900 placeholder-stone-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'confirmPassword'
                      ? 'border-stone-900 shadow-md'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                />
              </div>

              {/* Login Link */}
              <div className="text-center text-sm">
                <span className="text-stone-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentState('login');
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="text-stone-900 font-semibold hover:underline transition-all"
                >
                  Login Here
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-3 font-light text-lg tracking-wider hover:bg-stone-800 active:scale-95 transition-all duration-200 uppercase"
              >
                Sign Up
              </button>
            </div>
          )}
        </form>

        {/* Footer Text */}
        <div className="text-center mt-8 text-stone-600 text-sm font-light">
          <p>Elegant authentication experience</p>
        </div>
      </div>

      
    </div>
  );
}