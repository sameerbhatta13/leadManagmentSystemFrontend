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
import DashboarLayout from './src/components/DashboarLayout'
import ActiveLead from './src/manageLeads/ActiveLead'
import FolloupLead from './src/manageLeads/FolloupLead'
import ClientLead from './src/manageLeads/ClientLead'
import StudentLead from './src/manageLeads/StudentLead'
import CancelLead from './src/manageLeads/CancelLead'
import ServiceList from './src/service/ServiceList'
import Otp from './src/pages/Otp'
import UpdateAdmin from './src/pages/UpdateAdmin'

const MyRoutes = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<Login />} />
                    <Route path='/about' element={<UpdateStatus />} />
                    <Route path='/service' element={<UserList />} />
                    <Route path='/userstate' element={<Protected Cmp={UserList} />} />
                </Route>

                <Route path='/inputform' element={<InputForm />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/update/admin' element={<UpdateAdmin />} />

                <Route path='' element={<Protected Cmp={DashboarLayout} />} >
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/active' element={<ActiveLead />} />
                    <Route path='/followup' element={<FolloupLead />} />
                    <Route path='/client' element={<ClientLead />} />
                    <Route path='/student' element={<StudentLead />} />
                    <Route path='/cancel' element={<CancelLead />} />
                    <Route path='/services' element={<ServiceList />} />
                </Route>
            </Routes>

        </>
    )
}

export default MyRoutes