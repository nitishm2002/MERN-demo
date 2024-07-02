import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const ShowUsers = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/get-user');
                setRows(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = (userId) => {
        const deleteUser = async () => {
            try {
                await axios.delete(`http://localhost:8000/api/v1/delete-user/${userId}`);
                setRows(rows.filter((row) => row.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };
        deleteUser();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 160,
        }, {
            field: 'gender',
            headerName: 'Gender',
            width: 160,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <Box sx={{ height: 400, width: '80%', display: 'flex', alignItems: 'center', mt: '30px', ml: 'auto', mr: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
}

export default ShowUsers;
