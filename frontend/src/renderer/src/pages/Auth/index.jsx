import { useEffect, useState } from 'react';
import Form from '../../components/Form';
import './styles.css';
import useAuth from './useAuth';
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const { user, login, signUp, isLoading, error, token } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const handleAuthSubmit = (formData) => {
    if (isLoginForm) {
      login(formData.email, formData.password);
    } else {
      signUp(formData.name, formData.email, formData.password);
    }
  };

  useEffect(()=> {
    if(user && token) {
        navigate('/dashboard');
    }
  }, [user, token, navigate])

  return (
    <div className="auth-page flex column justify-center align-center">
      <h1 className='title'>Pixly</h1>
      <Form
        isLogin={isLoginForm}
        toggleAuthMode={() => setIsLoginForm((prev) => !prev)}
        onSubmit={handleAuthSubmit}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Auth;