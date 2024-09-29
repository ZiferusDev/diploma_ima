import { Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Header } from '../components/Header';
import { css } from '@emotion/css';

export const Main = () => {
    return (
        <>
            <Header />
            <div
                className={css`
                    display: flex;
                    width: 100%;
                    max-height: calc(100vw - 60px);
                `}
            >
                <NavBar />
                <Outlet />
            </div>
        </>
    );
};
