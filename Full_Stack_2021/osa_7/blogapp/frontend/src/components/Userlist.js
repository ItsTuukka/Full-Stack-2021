import { Link } from 'react-router-dom'

const Userlist = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </th>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Userlist
