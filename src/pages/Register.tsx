import { Button, TextField, Typography } from '@mui/material';
import { useForm } from '@tanstack/react-form';
import registerImg from '../assests/register.png';
import { css } from '@emotion/css';
import { useRegisterMutation } from '../store/services/auth';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [register, regMutation] = useRegisterMutation();
  const form = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordValidation: '',
    },
    onSubmit: async ({ value }) => {
      register({
        email: value.email,
        fullname: value.username,
        password: value.password,
      });
    },
  });

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
      <img src={registerImg} />
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
        <Typography variant="body1" color="textSecondary" fontWeight={300}>
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
          name="username"
          children={field => {
            return (
              <>
                <TextField
                  label={'Имя пользователя'}
                  variant="outlined"
                  placeholder="Введите имя пользователя"
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
          name="password"
          children={field => {
            return (
              <>
                <TextField
                  label={'Пароль'}
                  variant="outlined"
                  placeholder="Пароль"
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
          name="passwordValidation"
          children={field => {
            return (
              <>
                <TextField
                  label={'Повторите пароль'}
                  variant="outlined"
                  placeholder="Повторите пароль"
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
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          `}
        >
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit]) => (
              <Button
                disableElevation
                size="large"
                className={css`
                  width: 100%;
                `}
                type="submit"
                variant="contained"
                disabled={!canSubmit || regMutation.isLoading}
              >
                Войти
              </Button>
            )}
          />

          <Typography>
            {' '}
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};
