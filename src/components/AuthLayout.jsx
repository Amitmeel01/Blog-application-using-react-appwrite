import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.isAuthenticated); // Adjust this selector based on your Redux state structure

    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true);

            // Simplified logic to handle authentication status
            if (authentication && !authStatus) {
                navigate('/login');
            } else if (!authentication && authStatus) {
                navigate('/');
            }

            setLoading(false);
        };

        checkAuthStatus();
    }, [authStatus, navigate, authentication]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return <>{children}</>;
}
