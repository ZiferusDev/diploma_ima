import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ErrorPage } from './pages/Error';
import { Main } from './pages/Main';
import './index.css';
import { UsersTable } from './components/UsersTable';
import { TasksTable } from './components/TasksTable';

const router = createHashRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: 'users', element: <UsersTable /> },
            { path: 'tasks', element: <TasksTable /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/*', element: <ErrorPage /> },
]);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
