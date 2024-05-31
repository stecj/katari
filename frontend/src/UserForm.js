import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';
import './UserForm.css';

function UserForm({ company }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        dni: '',
        email: '',
        password: '',
        company_id: company.id, // Agregar el id de la empresa
    });
    const [formErrors, setFormErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            try {
                await axios.post('http://localhost:5000/api/user/register', formData);
                setShowAlert(true);
                setFormData({
                    name: '',
                    lastname: '',
                    dni: '',
                    email: '',
                    password: '',
                    company_id: company.id, // Mantener el id de la empresa
                });
                setFormErrors({});
                setTimeout(() => {
                    navigate(`/${company.name.toLowerCase()}/lista`);
                }, 2000);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.name.trim()) {
            errors.name = 'El nombre es obligatorio';
        }
        if (!data.lastname.trim()) {
            errors.lastname = 'Los apellidos son obligatorios';
        }
        if (!data.dni.trim()) {
            errors.dni = 'El DNI es obligatorio';
        } else if (!/^\d{8}$/.test(data.dni)) {
            errors.dni = 'El DNI debe ser un número de 8 dígitos';
        }
        if (!data.email.trim()) {
            errors.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'El correo electrónico no es válido';
        }
        if (!data.password.trim()) {
            errors.password = 'La contraseña es obligatoria';
        }
        return errors;
    };

    return (
        <div className="form-container">
            <h2>Registro de Usuario - {company.name}</h2>
            {showAlert && (
                <Alert
                    message={`Usuario registrado exitosamente en la compañía: ${company.name}`}
                    onClose={handleAlertClose}
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? 'error-input' : ''}
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Apellidos"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className={formErrors.lastname ? 'error-input' : ''}
                    />
                    {formErrors.lastname && <span className="error-message">{formErrors.lastname}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="dni"
                        name="dni"
                        placeholder="DNI"
                        value={formData.dni}
                        onChange={handleInputChange}
                        className={formErrors.dni ? 'error-input' : ''}
                    />
                    {formErrors.dni && <span className="error-message">{formErrors.dni}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error-input' : ''}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={formErrors.password ? 'error-input' : ''}
                    />
                    {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default UserForm;