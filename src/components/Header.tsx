import { css } from '@emotion/css';
import {
    CircularProgress,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import Logo from '../assests/logo.svg?react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../store/services/users';

export const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { data: user, isLoading } = useGetCurrentUserQuery();
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
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 20px;
                `}
            >
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Typography color="#FFF">{user?.username}</Typography>
                )}
                <IconButton
                    onClick={() => {
                        document.cookie = '';
                        navigate('/login');
                    }}
                >
                    <LogOut size={26} color="#FFF" />
                </IconButton>
            </div>
        </header>
    );
};
