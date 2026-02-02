import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import temp from '../assets/temp.png'
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { setPosts } from '@/redux/postSlice'

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth)
  const { posts } = useSelector(store => store.post)
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLikes, setPostLikes] = useState(post.likes.length);
  
  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post._id}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      const updatedPostData = posts.filter((postItem) => {
        return postItem?._id != post?._id
      })
      dispatch(setPosts(updatedPostData));
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked? 'dislike' : 'like'
      const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, { withCredentials: true });
      if (res?.data?.success) {
        setPostLikes(liked ? postLikes-1 : postLikes+1);
        setLiked(!liked);
        toast.success(res.data.message);
        console.log(res.data.message)
      }
      
    }
    catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  }

  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image">
              <AvatarFallback>CN</AvatarFallback>
            </AvatarImage>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className='flex flex-col items-center text-sm text-center'>
            <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956] font-bold'>Unfollow</Button>
            <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorites</Button>

            {
              post?.author._id == user?._id ? (
                <Button onClick={deletePostHandler} variant='ghost' className='cursor-pointer w-fit'>Delete</Button>
              ) : (
                ""
              )

            }

          </DialogContent>
        </Dialog>
      </div>
      <img
        className='rounded-sm my-2 w-full aspect-square object-cover'
        src={post.image}
        alt="post_img"
      />

      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center gap-3'>
          {
            liked ? (
              <FaHeart onClick={likeOrDislikeHandler} className='pt-0.5 cursor-pointer text-red-600' size={'27px'} />
            ) : (
              <FaRegHeart onClick={likeOrDislikeHandler} className='pt-0.5 cursor-pointer hover:text-gray-600' size={'27px'} />
            )
          }


          <MessageCircle onClick={() => setOpen(true)} className='cursor-pointer hover:text-gray-600' />
          <Send className='cursor-pointer hover:text-gray-600' />
        </div>
        <Bookmark className='cursor-pointer hover:text-gray-600' />
      </div>

      <span className='font-medium block mb-2'>{postLikes} likes</span>
      <p>
        <span className='font-medium mr-2'>{post.author?.username}</span>
        {post.caption}
      </p>
      <span className='cursor-pointer text-sm text-gray-400' onClick={() => setOpen(true)}>View all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className='flex items-center justify-between'>
        <input
          type='text'
          placeholder='Add a comment...'
          value={text}
          onChange={changeEventHandler}
          className='outline-none text-sm w-full'
        />
        {
          text ? (<span className='text-[#3BADF8]'>Post</span>) : ("")
        }
      </div>
    </div>

  )
}

export default Post
