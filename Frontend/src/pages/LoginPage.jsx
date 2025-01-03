import axios from "axios";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import logincss from './login.module.css'
import "regenerator-runtime/runtime";
import speech from 'react-speech-recognition';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function MyApp({ mode, setMode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        minHeight: '56px',
      }}
    >
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) =>
            setMode(event.target.value)
          }
        >

          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}



export const SignUpPage = (props) => {

  // making login page and navigate after signing in


  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();

  const [mode, setMode] = useState('light'); // Default theme

  // Create the theme dynamically based on mode
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });


  const handleSignUp = async (event) => {
    // handle signin 
    event.preventDefault();
    const formData = new FormData(event.target);
    // get form data using FormData 
    const data = Object.fromEntries(formData);
    //  create data in form of object 
    try {
      //  submit user into data base 
      const response = await axios.post("https://backend-to-do-11q2.onrender.com/user/signup", data);
      if (response.status === 200) {
        props.setIsLogedIn(1);
        // set logged in  and set localstorage and username in to maintain user data 
        localStorage.setItem('loginDate', new Date());
        localStorage.setItem('username', data.username);
        navigate("/");
      } else {
        console.error("Sign up failed:", response);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <h2 className={logincss.heading} >SignUP</h2>
      <Form method="POST" onSubmit={handleSignUp} className={logincss.form}>
        <div className={logincss.username}>
          <label htmlFor="userName" style={{paddingTop:"22px"}} >User - Name</label>
          <TextField
            type="text"
            id="userName"
            placeholder="User - Name"
            name="username"
            autoComplete="off"
            className={logincss.inputUsername}
            required
            label="UserName"
            variant="outlined"
          />
        </div>
        <div className={logincss.username} >
          <label htmlFor="password" style={{paddingTop:"22px"}}>Password</label>
          {/* check box is used to convert the password area into text area    */}
          <TextField
            type={seePassword? "password" : "text"}
            autoComplete="current-password"
            id="password"
            name="password"
            className={logincss.inputUsername}
            label="Password"
            variant="outlined"
            required
          />
        </div>
        <div className="seePassword">
          <span>Show Password</span>
          <Checkbox
            {...label}
            type="checkbox"
            checked={seePassword} 
            onChange={() => setSeePassword(!seePassword)}
          />
        </div>
        <Button variant="contained" type="submit" className={logincss.btn}>Submit</Button>
      </Form>
      <MyApp mode={mode} setMode={setMode} />
    </ThemeProvider>
    </>
  );
};
