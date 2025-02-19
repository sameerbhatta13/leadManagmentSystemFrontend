import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './src/components/MainLayout'
import About from './src/pages/About'
import InputForm from './src/pages/InputForm'
import UserList from './src/pages/UserList'

const MyRoutes = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<InputForm />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/services' element={<UserList />} />

                </Route>
            </Routes>

        </>
    )
}

export default MyRoutes