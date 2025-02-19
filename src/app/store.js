import { configureStore } from '@reduxjs/toolkit'
// import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserApi } from '../redux/api/userApi'


export const store = configureStore({
    reducer: {
        [UserApi.reducerPath]: UserApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(UserApi.middleware,

        ),

})

setupListeners(store.dispatch)
