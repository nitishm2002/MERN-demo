import Box from '@mui/material/Box';
import { Button, FormControl, TextField, Container, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ShowUsers from './ShowUsers';

const AddUser = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, reset } = useForm({
        mode: 'onChange'
    });

    const onSubmit = async data => {
        let payload = { name: data.name, gender: data.gender };
        console.log('payload: ', payload);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/add-user', payload);
            const responseData = response.data;
            alert(responseData.message);
            reset();
            navigate('/');
        } catch (error) {
            alert(error);
            console.log('error: ', error);
        }
    };

    return (
        <>
            <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                    <h2>Add User Form</h2>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                                name='name'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        autoFocus
                                        onChange={onChange}
                                        id='name'
                                        value={value}
                                        placeholder="Enter Name"
                                    />
                                )}
                            />
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl sx={{ mb: 4 }}>
                                    <FormLabel id="gender-label">Select Gender</FormLabel>
                                </FormControl>
                            </Grid>

                            <Grid item xs={8}>
                                <FormControl sx={{ mb: 4 }}>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        defaultValue="male"
                                        render={({ field: { value, onChange } }) => (
                                            <RadioGroup
                                                row
                                                aria-labelledby="gender-label"
                                                value={value}
                                                onChange={onChange}
                                            >
                                                <FormControlLabel value="male" control={<Radio />} label='Male' />
                                                <FormControlLabel value="female" control={<Radio />} label='Female' />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>


                        <Button
                            sx={{ borderRadius: '10px', height: '48px', fontWeight: 600 }}
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                        >
                            Add
                        </Button>
                    </form>
                </Box>

            </Container>

            <Container sx={{ mt: '1px' }}>
                <ShowUsers />
            </Container>

        </>
    );
}

export default AddUser;
