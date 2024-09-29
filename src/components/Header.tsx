import { css } from '@emotion/css';
import { IconButton, useTheme } from '@mui/material';
import Logo from '../assests/logo.svg?react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <header
            className={css`
                width: 100%;
                background-color: ${theme.palette.primary.light};
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 32px;
            `}
        >
            <Logo />
            <IconButton
                onClick={() => {
                    document.cookie = '';
                    navigate('/login');
                }}
            >
                <LogOut size={26} color="#FFF" />
            </IconButton>
        </header>
    );
};
