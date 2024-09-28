import { Typography } from '@mui/material';
import { Frown } from 'lucide-react';

export const ErrorPage = () => {
  return (
    <>
      <Typography variant="h1"> 404 NOT FOUND</Typography>
      <Frown size={90} />
    </>
  );
};
