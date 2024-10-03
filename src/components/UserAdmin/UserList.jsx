import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]); // Inicializar como un array
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3005/users');
                // Acceder a la propiedad 'Users' del JSON
                if (Array.isArray(response.data.Users)) {
                    setUsers(response.data.Users); // Establecer el array de usuarios
                } else {
                    console.error('Expected an array but got:', response.data.Users);
                    setUsers([]); // Establecer como un array vacío si no es un array
                }
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err); // Establecer el error en el estado
            } finally {
                setLoading(false); // Finalizar carga
            }
        };

        getUsers();
    }, []);

    if (loading) {
        return <div>Cargando usuarios...</div>; // Mensaje de carga
    }

    if (error) {
        return <div>Error al cargar usuarios: {error.message}</div>; // Mensaje de error
    }

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.firstName} {user.lastName} - {user.email} - {user.rol}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No se encontraron usuarios</div> // Mensaje si no hay usuarios
            )}
        </div>
    );
};

export default UsersList;
