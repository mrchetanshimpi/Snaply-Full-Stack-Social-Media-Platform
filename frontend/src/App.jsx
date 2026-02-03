
import './App.css'
import Login from './components/Login'
import Signup from './components/SignUp'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainContainer from './components/MainContainer'
import Profile from './components/Profile'
import Home from './components/Home'
import ChatPage from './components/ChatPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<MainContainer/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/account/edit' element={<Profile/>}/>
          <Route path='/chat' element={<ChatPage/>}/>

        </Route>
        
      </Routes>
    </>
  )
}

export default App
