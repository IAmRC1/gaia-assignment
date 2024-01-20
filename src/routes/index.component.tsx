import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileRoute, useNavigate } from '@tanstack/react-router'

const defaultTheme = createTheme();

export const Route = new FileRoute('/').createRoute({
  component: Register,
})

export default function Register() {
  const navigate = useNavigate()
  const registrationSchema = Yup.object().shape({
    name: Yup.string()
      .required('required!')
      .min(4, 'too Short, minimum 4 letters!')
      .max(20, 'too Long!'),
    email: Yup.string().required('required').email('invalid email!'),
    password: Yup.string()
      .required('required!')
      .min(8, 'must be at least 8 characters!')
      .max(20, 'too Long!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'),
    phone: Yup.string()
      .required('required!')
      .matches(/^[0-9]+$/, 'phone number must contain only digits!')
      .length(10, 'only 10 digits allowed!'),
  });

  const {handleSubmit, handleChange, values, touched, errors, isSubmitting} = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      remember: false
    },
    validationSchema: registrationSchema,
    onSubmit: values => {
      console.log(values);
      fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data, null, 2))
        navigate({ to: '/login' })
      })
      .catch(err => console.error(err))
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h4'>
            SIGN UP
          </Typography>
          <Box component='form'  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              placeholder='John Doe'
              autoFocus
              onChange={handleChange}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              type='email'
              name='email'
              placeholder='john@doe.com'
              autoComplete='email'
              onChange={handleChange}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              placeholder='Enter password'
              id='password'
              onChange={handleChange}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              id='phone'
              label='Phone'
              name='phone'
              placeholder='9876543210'
              onChange={handleChange}
              value={values.phone}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <FormControlLabel
              control={<Checkbox name='remember' onChange={handleChange} color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}