
import { useEffect } from 'react';
import UserList from '../pages/UserList'

const Dashboard = () => {

    useEffect(() => {
        console.log('called')
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    return (
        <div>
            <UserList />
        </div>

    );
}

export default Dashboard;