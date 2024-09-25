import '../pages/Profile.css';
import { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import Swal from 'sweetalert2'

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

    const teams = [
        { name: "Team A", image: "url_to_team_a_image" },
        { name: "Team B", image: "url_to_team_b_image" },
        { name: "Team C", image: "url_to_team_c_image" }
    ];

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setIsLoggedIn(true);
            setFormData(storedUser);
            console.log('Current User:', storedUser);
        }
    }, []);

    const handleRegister = (formData) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(formData));
        setIsLoggedIn(true);
        setFormData(formData);
        Swal.close();
        console.log('Current User:', formData);
    };

    const handleLogin = (storedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        setIsLoggedIn(true);
        setFormData(storedUser);
        console.log('Current User:', storedUser);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            team: '',
            athlete: ''
        });
    };

    if (isLoggedIn) {
        const selectedTeam = teams.find(team => team.name === formData.team);
        return (
            <div>
                <h1>{formData.firstName} {formData.lastName}</h1>
                <p>Email: {formData.email}</p>
                <p>Telefone: {formData.phone}</p>
                <p>Time Preferido: {formData.team}</p>
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

        <AuthForm onLogin={handleLogin} onRegister={handleRegister} teams={teams} />

    );
};

export default Profile;