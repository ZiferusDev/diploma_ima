import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export const Main = () => {
    const navigate = useNavigate();
    if (!document.cookie) navigate('/');
    return (
        <>
            <NavBar />
        </>
    );
};
