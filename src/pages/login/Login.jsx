import { Box, Button, Card, Container, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import { login } from '../../api/apiService';
import { toast } from 'react-toastify';

const Login = () => {


      const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
const [loading, setLoading] = useState(false)
  

  const handleSubmit = async (event) => {
  

    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);

      try {
          setLoading(true)

      let payload = {
        email:data.get('email'),
        password:data.get('password')
      }

      const res = await login(payload);
         setLoading(false)

        if(res?.data?.success){
            localStorage.setItem("admintoken", res?.data?.data?.accessToken);
            window.location.href = "/dashboard";

        } else{
              toast.error(res?.data?.message)
        }



  
    } catch (err) {
        setLoading(false)
      toast.error(err?.response?.data?.message)
    
    } finally {
       setLoading(false)
    }
  };

const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };




  return (
    <Box
    className='login-container'
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height:'100vh',
    background:'#f1f1f1'
  }}
>

        <Container maxWidth="sm" >
   
         <Card variant="outlined" sx={{p:3, boxShadow: 2,borderRadius:3}}>
                 <Typography
            component="h1"
            variant="h5"
            sx={{ width: '100%', mb:2}}
          >
            Sign in
          </Typography>
           <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
             <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
               helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
               color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
             <Button
              type="submit"
              variant="contained"
              onClick={validateInputs}
              sx={{p:2,mt:2}}
            >
              {loading ? 'Loading...' : 'Sign in'}
              
            </Button>
          </Box>
         </Card>
              </Container>


</Box>
 
  )
}

export default Login