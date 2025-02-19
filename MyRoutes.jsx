import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './src/components/MainLayout'
import About from './src/pages/About'
import InputForm from './src/pages/InputForm'
import UserList from './src/pages/UserList'
import UpdateForm from './src/pages/updateForm'
import UpdateStatus from './src/pages/UpdateStatus'

const MyRoutes = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<InputForm />} />
                    <Route path='/about' element={<UpdateStatus />} />
                    <Route path='/services' element={<UserList />} />
                    <Route path='/contact' element={<UpdateForm />} />

                </Route>
            </Routes>

        </>
    )
}

export default MyRoutes