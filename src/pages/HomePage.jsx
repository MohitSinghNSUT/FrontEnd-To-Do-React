import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import homecss from './homepage.module.css';
import logincss from './login.module.css'
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button } from "@mui/material";
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


export const HomePage = ({ isLogedIn, setIsLogedIn }) => {
    const [data, setData] = useState([]);
    const [seePassword, setSeePassword] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [title, settitle] = useState("");
    const [work, setWork] = useState("");
    const [reload, setReload] = useState(0);
    const [updateData, setUpdateData] = useState(0);
    const [currele, setCurrele] = useState({});
    const navigate = useNavigate();
    const [mode, setMode] = useState('light'); // Default theme

    // Create the theme dynamically based on mode
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    useEffect(() => {
        // check if logged in 
        if (isLogedIn) {
            // get username from localstorage
            const username = localStorage.getItem('username');
            const getAllData = async () => {
                // fetch data based on username
                const alldata = await axios.post("https://backend-to-do-11q2.onrender.com/user/alldataget", {
                    username: username
                });
                // set data 
                setData(alldata.data);
            };

            getAllData();
        }
    }, [isLogedIn, reload]);

    const handleSubmitTodo = async () => {
        // get username from localstorage
        const username = localStorage.getItem('username');
        if (username === null) {
            // if not found in localstorage means not loagged in 
            return;
        }
        // submit the data into data base 
        const data = {
            username: username,
            title: title,
            work: work
        };
        const addData = await axios.post("https://backend-to-do-11q2.onrender.com/user/alldatainsert", data);
        setReload(!reload);
        settitle("");
        setWork("");
    };

    const handleLoginSubmit = async (data) => {
        // Check login data
        const checkUser = await axios.post("https://backend-to-do-11q2.onrender.com/user/login", data);
        // check if user present and update the local storage 
        if (checkUser.data) {
            setIsLogedIn(1);
            localStorage.setItem('loginDate', new Date().toString());
            localStorage.setItem('username', data.username);
        }
    };

    const handleLogout = () => {
        const oldDate = new Date('2000-01-01T00:00:00Z');
        localStorage.setItem('loginDate', oldDate.toString());
        // logout the user by setting the time to be very large 
        setIsLogedIn(0); // Update the login state to 0 (logged out)
        // remove the user as well
        localStorage.removeItem('username');
    };
    const handleDelete = async (id) => {
        // delete the data when clicked on delete btn
        // based on the id 
        const response = await axios.post("https://backend-to-do-11q2.onrender.com/user/deletedata", {
            _id: id
        });
        // update the array 
        setReload(!reload);
    }
    const handleUpdateValues = async () => {
        console.log("tittle", title);
        console.log("work", work);
        const newEle = { ...currele, title, work };
        // update the data by first bringing it in to the 
        // two input areas
        const response = await axios.post("https://backend-to-do-11q2.onrender.com/user/updatedata", newEle);
        setReload(!reload);
        settitle("");
        setWork("");
        setCurrele({});
        // remove all the data present in title and work after updating it 
        setUpdateData(0);
    }
    const handleUpdate = (ele) => {
        if (updateData) return;
        // once clicked on update not allow others to click in it untill it gets updates ->maintiain  concurrency 
        setUpdateData(1);
        settitle(ele.title);
        setWork(ele.work);
        setCurrele(ele);
    }
    if (isLogedIn) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {/* making the to-do area  */}
                    <div className={homecss.container}>
                        <Button variant="contained" onClick={handleLogout} className={homecss.btn} >Logout</Button>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={title} onChange={(e) => {
                            settitle(e.target.value)

                        }} className={homecss.input} />
                        <label htmlFor="tododata">Write Your To Do</label>
                        <textarea name="tododata" id="tododata" cols="40" rows="30" value={work} onChange={(e) => setWork(e.target.value)} placeholder="Write" className={homecss.textarea} ></textarea>
                        <Button variant="contained" type="Button" style={{
                            display: updateData ? "none" : "inline"
                        }} onClick={handleSubmitTodo} className={homecss.btn} >Submit</Button>
                        <Button variant="contained" type="Button" style={{
                            display: updateData ? "inline" : "none"
                        }} onClick={handleUpdateValues} className={homecss.btn}>Update</Button>

                    </div>
                    {/* display all the data from todos */}
                    <div className="allData">
                        <ul className={homecss.ul}>
                            {data.map((ele) => (
                                <li key={ele._id} className={homecss.li}>
                                    <span>Title : {ele.title} </span> <span>Work : {ele.work}</span>
                                    <Button variant="contained" onClick={() => handleDelete(ele._id)} className={homecss.btn} > <AiFillDelete style={{
                                        fontSize: "1.5rem"
                                    }} /> </Button>
                                    <Button variant="contained" onClick={() => handleUpdate(ele)} className={homecss.btn} >Update</Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <MyApp mode={mode} setMode={setMode} />
                </ThemeProvider>
            </>
        );
    } else {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {/* navigate is used to move to signup page when clicked on it  */}
                    <div className={logincss.container}>
                        <Button variant="contained" onClick={() => navigate('/signup')} className={`${homecss.btn} ${homecss.signup}`} >SignUp</Button>

                        {/*  react hook form is used to  make login page and do authentication as well  */}
                        <form onSubmit={handleSubmit(handleLoginSubmit)} className={logincss.form}>
                            <label htmlFor="username">Username</label>
                            <input {...register("username", { required: true })} className={logincss.inputUsername} />
                            {errors.username && <span>This field is required</span>}

                            <label htmlFor="password">Password</label>
                            <input type={seePassword ? "password" : "text"} {...register("password", { required: true })} className={logincss.inputUsername} />
                            {errors.password && <span>This field is required</span>}
                            <div className="seePassword">
                                <span>Show Password</span>
                                <input type="checkbox" onClick={() => setSeePassword(!seePassword)} />
                            </div>
                            <input type="submit" value="Login" className={homecss.btn} />
                        </form>
                    </div>
                    <MyApp mode={mode} setMode={setMode} />
                </ThemeProvider>
            </>
        );
    }
};
