import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';

const Router = () => {
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/companies');
                const data = await response.json();
                setCompanies(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching companies:', error);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home companies={companies} />} />
                {companies.map((company) => (
                    <Route
                        key={company.id}
                        path={`/${company.name.toLowerCase()}/*`}
                        element={
                            <CompanyRoutes
                                key={company.id}
                                company={company}
                            />
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

const Home = ({ companies }) => (
    <div className="home">
        <h1>Seleccione una empresa</h1>
        <div className="button-container">
            {companies.map((company) => (
                <Link
                    key={company.id}
                    to={`/${company.name.toLowerCase()}/lista`}
                    className={`button ${company.name.toLowerCase()}-button`}
                >
                    {company.name}
                </Link>
            ))}
        </div>
    </div>
);

const CompanyRoutes = ({ company }) => (
    <Routes>
        <Route
            path="/lista"
            element={<UserList company={company} />}
        />
        <Route
            path="/registro"
            element={<UserForm company={company} />}
        />
    </Routes>
);

export default Router;