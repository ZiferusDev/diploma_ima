import { Button, TextField, Typography } from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { css } from '@emotion/css';
import { useGetTokenMutation } from '../store/services/auth';
import { AuthCredentials } from '../types/authtype';
import loginImg from '../assests/login.png';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const form = useForm<AuthCredentials>({
        defaultValues: {
            email: 'admin',
            password: 'admin',
        },
        validators: {
            onChange: ({ value }) => {
                if (!value.email || !value.password)
                    return 'Одно из полей не заполнено';
                return;
            },
        },
        onSubmit: async ({ value }) => {
            await getToken(value);
            if (tokenMutaion.isError) throw new Error('Ошибка входа');
            navigate('/');
        },
    });
    const [getToken, tokenMutaion] = useGetTokenMutation();

    return (
        <div
            className={css`
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 32px;
                margin-top: 144px;
            `}
        >
            <img src={loginImg} />
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    margin-top: 24px;
                `}
            >
                <Typography variant="h3">Добро пожаловать!</Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    fontWeight={300}
                >
                    Пожалуйста, авторизуйтесь
                </Typography>
            </div>
            <form
                className={css`
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    width: 400px;
                `}
                onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="email"
                    validators={{
                        onChange: ({ value }) => {
                            return !value
                                ? 'Необходимо ввести логи'
                                : value.length < 3
                                  ? 'Логин должен иметь минимум 3 символа'
                                  : undefined;
                        },
                        onChangeAsyncDebounceMs: 100,
                    }}
                    children={field => {
                        return (
                            <>
                                <TextField
                                    label={'Email'}
                                    variant="outlined"
                                    placeholder="Введите email"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={e => {
                                        field.handleChange(e.target.value);
                                    }}
                                    error={Boolean(
                                        !field.state.meta.isValidating &&
                                            field.state.meta.isTouched &&
                                            field.state.meta.errors.length,
                                    )}
                                    helperText={
                                        !field.state.meta.isValidating &&
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length
                                            ? field.state.meta.errors.join(',')
                                            : undefined
                                    }
                                />
                            </>
                        );
                    }}
                ></form.Field>
                <form.Field
                    validators={{
                        onChange: ({ value }) => {
                            return !value
                                ? 'Необходимо ввести пароль'
                                : undefined;
                        },
                        onChangeAsyncDebounceMs: 100,
                    }}
                    name="password"
                    children={field => {
                        return (
                            <>
                                <TextField
                                    label={'Пароль'}
                                    variant="outlined"
                                    placeholder="••••••••"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={e => {
                                        field.handleChange(e.target.value);
                                    }}
                                    helperText={
                                        !field.state.meta.isValidating &&
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length
                                            ? field.state.meta.errors.join(',')
                                            : undefined
                                    }
                                    error={Boolean(
                                        !field.state.meta.isValidating &&
                                            field.state.meta.isTouched &&
                                            field.state.meta.errors.length,
                                    )}
                                />
                            </>
                        );
                    }}
                ></form.Field>
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 16px;
                    `}
                >
                    <form.Subscribe
                        selector={state => [
                            state.canSubmit,
                            state.isSubmitting,
                        ]}
                        children={([canSubmit]) => (
                            <Button
                                disableElevation
                                size="large"
                                className={css`
                                    width: 100%;
                                `}
                                type="submit"
                                variant="contained"
                                disabled={!canSubmit || tokenMutaion.isLoading}
                            >
                                Войти
                            </Button>
                        )}
                    />

                    <Typography>
                        {' '}
                        Нет аккаунта?{' '}
                        <Link to="/register">Зарегестрироваться</Link>
                    </Typography>
                </div>
            </form>
        </div>
    );
};
