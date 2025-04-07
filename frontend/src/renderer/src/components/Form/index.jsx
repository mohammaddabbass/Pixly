import React, { useState } from 'react'; 
import './styles.css';
import InputGroup from '../InputGroup';
import Button from '../Button';

const Form = ({ isLogin, toggleAuthMode, onSubmit, error, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password, name });
      };
    

      return (
        <div className="form-container">
          <div className="form-header">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <div className="subheader">
              {isLogin ? 'Sign in to Trackify' : 'Join our community'}
            </div>
          </div>
    
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
    
            <InputGroup
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
            {!isLogin && (
              <InputGroup
                label="Username"
                type="text"
                placeholder="Choose a username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
    
            <InputGroup
              label="Password"
              type="password"
              placeholder={isLogin ? 'Enter your password' : 'Create a password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <Button
              variant="primary"
              buttonText={isLogin ? 'Sign In' : 'Create Account'}
              className="w-100"
              type="submit"
              disabled={isLoading}
            />
    
            {isLogin && (
              <>
                <div className="separator flex align-center">
                  <span>or</span>
                </div>
                <Button
                  variant="bordered"
                  buttonText="Continue with Google"
                  className="w-100"
                />
              </>
            )}
          </form>
    
          <div className="footer-links">
            <p onClick={toggleAuthMode}>
              {isLogin
                ? "Don't have an account? Create New Account"
                : "Already have an account? Sign In"}
            </p>
          </div>
        </div>
      );
};

export default Form;