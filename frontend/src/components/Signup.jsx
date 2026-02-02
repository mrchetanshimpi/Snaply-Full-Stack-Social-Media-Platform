import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import instalogo2 from '../assets/instalogo2.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!user.username || !user.email || !user.password) {
            toast.error("All fields are required");
            return;
        }
        try {
            // setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                });
                navigate('/login')
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form className='shadow-lg flex flex-col gap-2 p-8' onSubmit={submitHandler}>
                <div className='my-4 flex flex-col items-center'>
                    <img src={instalogo2} alt="" className='h-13 w-38' />
                    <p className='text-sm text-center'>Signup to see photos & videos from your freinds</p>
                </div>
                <div>
                    <span className='font-medium'>Username</span>
                    <Input
                        type='text'
                        className='focus-visible:ring-transparent my-2'
                        name='username'
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value });
                        }}
                        value={user.username}
                    />
                </div>
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type='text'
                        className='focus-visible:ring-transparent my-2'
                        name='email'
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                        value={user.email}
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type='password'
                        className='focus-visible:ring-transparent my-2'
                        name='password'
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                        value={user.password}
                    />
                </div>
                {
                    // loading ? (
                    //     <Button>
                    //         <Loader2 className='mr-2 h-10 w-4 animate-spin' />
                    //         Please wait
                    //     </Button>
                    // ) : (
                        <Button type='submit' className='mt-3 hover:cursor-pointer h-10'>Signup</Button>
                    // )
                }
                <span className='text-center'>Already have an account? <Link className='text-blue-600' to='/login'>Login</Link> </span>
            </form>
        </div>
    )
}

export default Signup
