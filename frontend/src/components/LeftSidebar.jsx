import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import instalogo1 from '../assets/instalogo1.webp'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux/authSlice'
import CreatePost from './createPost'
import toast from 'react-hot-toast'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate('/login');
                toast.success(res.data.message)
            }

        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType == 'Logout') {
            logoutHandler();
        }
        else if (textType == 'Create'){
            setOpen(true);
        }
    }

    const sidebarItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <Search />, text: 'Search' },
    { icon: <TrendingUp />, text: 'Explore' },
    { icon: <MessageCircle />, text: 'Messages' },
    { icon: <Heart />, text: 'Notifications' },
    { icon: <PlusSquare />, text: 'Create' },
    {
        icon: (
            <Avatar className='h-6 w-6'>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text: 'Profile'
    },
    { icon: <LogOut />, text: 'Logout' },
]

    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <div className='my-7 flex flex-col'>
                    <img src={instalogo1} alt="" className='h-14 w-38' />
                </div>
                <div>
                    {
                        sidebarItems.map((item, idx) => {
                            return (
                                <div onClick={() => sidebarHandler(item.text)} key={idx} className='flex items-center gap-3 my-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </div>
    )
}

export default LeftSidebar
