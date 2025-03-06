import { configureStore } from '@reduxjs/toolkit'
// import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserApi } from '../redux/Api/UserApi'
import { AdminApi } from '../redux/Api/Admin'
import { ServiceApi } from '../redux/Api/Service'
import AdminReducer from '../redux/Slice/AdminSlice'




export const store = configureStore({
    reducer: {
        admin: AdminReducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer,
        [ServiceApi.reducerPath]: ServiceApi.reducer


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(UserApi.middleware, AdminApi.middleware, ServiceApi.middleware

        ),


})

setupListeners(store.dispatch)
