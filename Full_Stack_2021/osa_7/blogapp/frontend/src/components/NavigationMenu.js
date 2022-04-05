import { Link } from 'react-router-dom'

const NavigationMenu = ({ user, logout }) => {
    const padding = {
        padding: 5,
    }
    return (
        <div>
            <Link style={padding} to="/">
                blogs
            </Link>
            <Link style={padding} to="/users">
                users
            </Link>
            {user && <em>{user.name} logged in</em>}
            {user && <button onClick={logout}>logout</button>}
        </div>
    )
}

export default NavigationMenu
