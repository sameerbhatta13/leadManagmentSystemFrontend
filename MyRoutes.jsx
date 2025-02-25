import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './src/components/MainLayout'
import About from './src/pages/About'
import InputForm from './src/pages/InputForm'
import UserList from './src/pages/UserList'
import UpdateStatus from './src/pages/UpdateStatus'
import FilterStatus from './src/components/FilterStatus'
import Login from './src/pages/Login'
import Dashboard from './src/components/Dashboard'
import Protected from './src/components/Protected'

const MyRoutes = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/about' element={<UpdateStatus />} />
                    <Route path='/services' element={<UserList />} />
                    <Route path='/userstate' element={<FilterStatus />} />
                    <Route path='/inputform' element={<InputForm />} />

                </Route>
                <Route path='/dashboard' element={<Protected Cmp={Dashboard} />} />
            </Routes>

        </>
    )
}

export default MyRoutes