import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../store/services/users';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Plus, ShieldCheck, ShieldX } from 'lucide-react';
import { css } from '@emotion/css';

export const UsersTable = () => {
    // const navigate = useNavigate();
    // if (!document.cookie) navigate('/login');
    const {
        data: users,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetUsersQuery();
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'fullname',
            headerName: 'Полное имя',
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Е-mail',
            width: 250,
            editable: false,
        },
        {
            field: 'verified',
            headerName: 'Верификация',
            type: 'number',
            width: 150,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: value =>
                value ? (
                    <ShieldCheck color="#14AE5C" />
                ) : (
                    <ShieldX color="#EC221F" />
                ),
        },
    ];

    const [rows, setRows] = useState<
        {
            id: number;
            fullname: string;
            email: string;
            verified: boolean;
        }[]
    >([]);

    useEffect(() => {
        const filteredUsersData: typeof rows =
            users?.map(user => {
                return {
                    id: user.id,
                    fullname: user.fullName,
                    email: user.email,
                    verified: user.verified,
                };
            }) || [];
        setRows(filteredUsersData);
    }, [isSuccess]);

    return (
        <div
            className={css`
                padding: 32px;
                display: flex;
                flex-direction: column;
                gap: 24px;
            `}
        >
            <Typography variant="h5" color="primary" fontWeight={500}>
                Участники
            </Typography>
            <Button variant="outlined">
                <Plus
                    size={20}
                    className={css`
                        margin-right: 10px;
                    `}
                />
                Добавить участников
            </Button>
            {isFetching || isLoading ? (
                <LinearProgress />
            ) : rows.length ? (
                <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                    />
                </Box>
            ) : (
                <div>Юзеры не найдены</div>
            )}
        </div>
    );
};
