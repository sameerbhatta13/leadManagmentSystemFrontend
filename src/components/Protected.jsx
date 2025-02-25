import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router'

const Protected = ({ Cmp }) => {

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('admin')

        if (token) {
            try {
                const { exp } = jwtDecode(token)
                const currTime = Date.now() / 1000
                if (currTime > exp) {
                    localStorage.removeItem('admin')
                    navigate('/login')
                }

            } catch (error) {
                console.error('Invalid Token', error.message)
                localStorage.removeItem('admin')
                navigate('/login')

            }
        }
        else {
            navigate('/login')

        }

    }, [navigate])

    return <Cmp />
}

export default Protected