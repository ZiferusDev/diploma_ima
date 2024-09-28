import { useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useGetTokenMutation } from '../store/services/auth';

export const Main = () => {
    const [_, tokenMutaion] = useGetTokenMutation();
    useEffect(() => {
        console.log('');
        localStorage.setItem(
            'expireDate',
            String(tokenMutaion?.data?.expireDate),
        );
        localStorage.setItem('token', String(tokenMutaion?.data?.token));
        document.cookie = `jwt=${tokenMutaion?.data?.token}`;
    }, [tokenMutaion?.isSuccess]);
    return (
        <>
            <NavBar />
        </>
    );
};
