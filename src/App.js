import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from "./components/UserList";

function App() {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePaginatedUser = () => {
        axios.get('http://localhost:8080/users?page='.concat(page.toString()))
            .then(response => {localStorage.setItem('page', JSON.stringify(page)); setUsers(response.data.items); setTotalPages(response.data.totalPages);})
            .catch(error => console.log(error));
    }

    useEffect(handlePaginatedUser, [page])

    useEffect(() => {
        const loadedPage = JSON.parse(localStorage.getItem('page'));
        const loadedUsers = JSON.parse(localStorage.getItem('users'));
        if (loadedUsers) {
            setUsers(loadedUsers);
        }
        if (loadedPage) {
            setPage(loadedPage);
        }
    }, []);

    const handleAddUser = () => {
        const formData = new FormData();

        formData.append("image", image, image.name);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("username", username);
        formData.append("active", isActive.toString());
        formData.append("location", location);
        formData.append("phoneNumber", phoneNumber);
        axios.post('http://localhost:8080/users', formData)
            .then(response => {
                handlePaginatedUser();
                setFirstName('');
                setLastName('');
                setUsername('');
                setLocation('');
                setPhoneNumber('');
                setImage(null);
            })
            .catch(error => console.log(error));
    };

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:8080/users/${id}`)
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch(error => console.log(error));
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">User Manager</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Add User</h2>
                    <form onSubmit={e => { e.preventDefault();handleAddUser(); }}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">first name</label>
                            <input type="text" className="form-control" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">last name</label>
                            <input type="text" className="form-control" id="name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">username</label>
                            <input type="text" className="form-control" id="name" value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="isActive" onChange={e => setIsActive(e.target.checked)} />
                                <label className="form-check-label" htmlFor="isActive">Active</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">location</label>
                            <input type="text" className="form-control" id="location" value={location} onChange={e => setLocation(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">phone number</label>
                            <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">Select image</label>
                            <input type="file" className="form-control" id="image" onChange={e => setImage(e.target.files[0])} required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Add User</button>
                    </form>
                </div>
                <UserList
                    users={users}
                    handleDeleteUser={(id) => handleDeleteUser(id)}
                    handlePaginatedUser={handlePaginatedUser}
                    changePage={setPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}

export default App;