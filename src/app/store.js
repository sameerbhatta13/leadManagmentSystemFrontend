import { configureStore } from '@reduxjs/toolkit'
// import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserApi } from '../redux/Api/UserApi'
import { AdminApi } from '../redux/Api/Admin'



export const store = configureStore({
    reducer: {
        [UserApi.reducerPath]: UserApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(UserApi.middleware, AdminApi.middleware

        ),

})

setupListeners(store.dispatch)
