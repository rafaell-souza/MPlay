import { Navigate } from 'react-router-dom';

export default function ProtectedRoute ({ element }: { element: JSX.Element }) {
    const token: string | null = sessionStorage.getItem("token");
    return token ? element : <Navigate to="/SignUp" />;
}