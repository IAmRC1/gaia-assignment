import Box from '@mui/material/Box';
import { Link } from '@tanstack/react-router'

export const component = function Login() {
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <span>You have registered successfully!</span>
            <Link to='/'>New Register</Link>
        </Box>
    )
}