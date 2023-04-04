import React from 'react';

function IsActiveTableCell(props) {
    if (props.isActive) {
        return (
            <>
                <span className="active-circle bg-success"></span>Active
            </>
        );
    }
    return (
        <>
            <span className="active-circle bg-danger"></span>Inactive
        </>
    );
}

function Items({ users, handleDeleteUser }) {
    return (
        <>
            {users.map(user => {return (
                <tr key={user.id}>
                    <td>
                        <div className="user-info">
                            <div className="user-info__img">
                                <img src={"http://localhost:8080".concat(user.imageFilePath)} alt="User Img"/>
                            </div>
                            <div className="user-info__basic">
                                <h5 className="mb-0">{user.firstName} {user.lastName}</h5>
                                <p className="text-muted mb-0">@{user.username}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <IsActiveTableCell isActive={user.active}/>
                    </td>
                    <td>{user.location}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                        <button className="btn btn-primary btn-sm">Contact</button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </td>
                </tr>
            )})}
        </>
    );
}

const handlePrevButtonClick = (totalPages, changePage) => {
    changePage((prev) => {
        if (prev > 1 && prev <= totalPages) return prev - 1;
        else return prev;
    })
}

const handleNextButtonClick = (totalPages, changePage) => {
    changePage((prev) => {
        if (prev > 0 && prev < totalPages) return prev + 1;
        else return prev;
    })
}

const UserList = ({ users, handleDeleteUser, handlePaginatedUser, changePage, totalPages }) => {
    localStorage.setItem('users', JSON.stringify(users));
    return (
        <>
            <h2>Users</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Phone</th>
                    <th>Contact</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <Items users={users} handleDeleteUser={handleDeleteUser}/>
                </tbody>
            </table>
            <button onClick={ (e) => { handlePrevButtonClick(totalPages, changePage); handlePaginatedUser();}}>Prev</button>
            <button onClick={ (e) => {handleNextButtonClick(totalPages, changePage); handlePaginatedUser();}}>Next</button>
        </>
    );
};

export default UserList;