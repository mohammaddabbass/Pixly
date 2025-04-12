import { useState } from "react";
import { requestMethods } from "../../utils/enums/request.methods";
import { request } from "../../utils/remote/axios";
const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("bearer_token") || null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await request({
                method: requestMethods.POST,
                route: "/guest/login",
                body: { email, password },
            });

            if (data.error) {
                throw new Error(data.message || "Login failed");
            }

            setToken(data.authorisation.token);
            setUser(data.user);
            localStorage.setItem("bearer_token", data.authorisation.token);
            console.log("success", data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await request({
                method: requestMethods.POST,
                route: "/guest/register",
                body: { name, email, password },
            });

            if (data.error) {
                throw new Error(data.message || "Sign up failed");
            }

            await login(email, password); 
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("bearer_token");
    };

    return {
        login,
        signUp,
        logout,
        isLoading,
        error,
        user,
        token,
    };
};

export default useAuth;
