import Sidebar from './LeftSidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainContainer = () => {
    return (
        <div>
            <Sidebar/>
            <div>
                <Outlet />
            </div>
        </div>

    )
}

export default MainContainer
