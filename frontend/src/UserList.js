import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

function UserList({ company }) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users?company=${company.name.toLowerCase()}&page=${currentPage}&limit=10`
                );

                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
                setTotalCount(response.data.totalCount);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [company.name, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="user-list">
            <h2>Lista de Usuarios - {company.name}</h2>
            <div className="button-container">
                <Link to={`/${company.name.toLowerCase()}/registro`} className="button register-button">
                    Registrar Usuario en {company.name}
                </Link>
            </div>
            {users.length === 0 ? (
                <p>No hay usuarios registrados en {company.name}.</p>
            ) : (
                <>
                    <p>Total de usuarios: {totalCount}</p>
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>DNI</th>
                            <th>Correo Electrónico</th>
                            <th>Compañía</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.dni}</td>
                                <td>{user.email}</td>
                                <td>{company.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserList;