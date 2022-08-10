import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import Lists from '../components/Lists/Lists';
import {useAppDispatch} from "../store/hooks";
import {createNewList} from "../store/slices/listsSlice";
import {validateTitle} from "../utils/utils";

const DashboardPage = () => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useAppDispatch()

    const addNewListItem = () => {
        dispatch(createNewList(inputValue))
        setInputValue('')
    }

    return (
        <Box p={2}>
            <Stack spacing={2} alignItems='center'>
                <Stack direction='row' spacing={2}>
                    <TextField
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <Button variant='text' size='small' disabled={error || !inputValue}  onClick={addNewListItem}>
                                       Add
                                    </Button>
                                </InputAdornment>
                        }}


                        error={error} helperText='only (Aa-Zz, 0-9)' size='small' id="outlined-basic"
                        label="Add new list"
                        variant="outlined"
                        value={inputValue} onChange={(e) => {
                        const value = e.target.value
                        if (value) {
                            setError(!validateTitle(value))
                            setInputValue(e.target.value)
                        } else {
                            setError(false)
                            setInputValue('')
                        }
                    }}/>

                </Stack>
                <Divider flexItem variant='middle'/>
                <Container>
                    <Lists/>
                </Container>
            </Stack>

        </Box>
    );
};

export default DashboardPage;