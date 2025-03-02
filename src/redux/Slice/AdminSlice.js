import { createSlice } from '@reduxjs/toolkit'


export const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        token: localStorage.getItem('admin')
    },
    reducers: {
        logout: (state) => {
            state.token = null
            localStorage.removeItem('admin')
            console.log(state.token)
        }
    }
})

export const { logout } = AdminSlice.actions
export default AdminSlice.reducer