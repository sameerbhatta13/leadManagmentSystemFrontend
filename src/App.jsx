
import './App.css'
import { Provider } from 'react-redux'

import MyRoutes from '../MyRoutes'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <MyRoutes />
      </Provider>


    </>
  )
}

export default App
