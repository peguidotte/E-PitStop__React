import React, { useState } from 'react';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        team: '',
        athlete: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const teams = [
        { name: "Team A", image: "url_to_team_a_image" },
        { name: "Team B", image: "url_to_team_b_image" },
        { name: "Team C", image: "url_to_team_c_image" }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(formData));
        setIsLoggedIn(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === loginData.email && storedUser.password === loginData.password) {
            setIsLoggedIn(true);
        } else {
            alert('Email ou senha incorretos');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user data from localStorage
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const selectedTeam = teams.find(team => team.name === storedUser.team);
        return (
            <div>
                <h1>{storedUser.firstName} {storedUser.lastName}</h1>
                <p>Email: {storedUser.email}</p>
                <p>Telefone: {storedUser.phone}</p>
                <p>Time Preferido: {storedUser.team}</p>
                {selectedTeam && (
                    <div>
                        <h2>Imagem do Time</h2>
                        <img src={selectedTeam.image} alt={selectedTeam.name} />
                    </div>
                )}
                <button onClick={handleLogout}>Sair</button>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={handleRegister}>
                    <input type="text" name="firstName" placeholder="Name" value={formData.firstName} onChange={handleInputChange} required />
                    <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} required />
                    <input type="text" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required minLength="6" />
                    <select name="team" value={formData.team} onChange={handleInputChange} required>
                        <option value="">Select your favorite team</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginInputChange} required />
                    <input type="password" name="password" placeholder="Senha" value={loginData.password} onChange={handleLoginInputChange} required minLength="6" />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;