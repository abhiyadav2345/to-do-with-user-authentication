import React, { FC, ReactNode } from 'react';
import { Card } from '@mui/material';
type Props = {
    children: ReactNode;
};
const TodoCard: FC<Props> = ({ children, ...props }) => {
    return (
        <Card
            {...props}
            sx={[
                { mt: 2 },
                (theme) => ({
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? 'primary.main'
                            : 'background.paper',
                }),
            ]}
        >
            {children}
        </Card>
    );
};

export default TodoCard;
