import '../pages/Profile.css';
import { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import Swal from 'sweetalert2';
import { MdOutlineEdit } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import User from '../assets/userprofile.png'

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        team: '',
        athlete: '',
        profilePicture: '',
        bio: 'Sua bio vem aqui!'
    });

    const [activeTab, setActiveTab] = useState('posts');

    const teams = [
        { name: "ABT CUPRA", color: "white" },
        { name: "ANDRETTI", color: "red" },
        { name: "DS PENSKE", color: "brown" },
        { name: "ENVISION", color: "green" },
        { name: "ERT", color: "lightgrey" },
        { name: "JAGUAR", color: "red" },
        { name: "MAHINDRA", color: "red" },
        { name: "MASERATI", color: "purple" },
        { name: "NEOM", color: "orange" },
        { name: "NISSAN", color: "red" },
        { name: "TAG HEUER PORSHE", color: "white" },
    ];

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setIsLoggedIn(true);
            setFormData(storedUser);
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
            username: '',
            phone: '',
            email: '',
            password: '',
            team: '',
            athlete: '',
            profilePicture: '',
            bio: 'Sua bio vem aqui!'
        });
        localStorage.removeItem('currentUser');
        console.log('User logged out');
    };
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleEditProfile = () => {
        Swal.fire({
            title: 'Editar Perfil',
            html: `
                <div class= "flex flex-col">
                    <label for="profilePicture">Foto</label>
                    <input type="file" id="profilePicture" class="swal2-input swalform" style="width: 100%;" />

                    <label for="bio" class=''>Bio</label>
                    <textarea id="bio" class="swal2-textarea swalform" placeholder="Bio" maxlength="100">${formData.bio || ""}</textarea>
                    
                    <label for="team">Altere seu time</label>
                    <select id="team" class="swal2-select swalform">
                        ${teams.map(team => `<option class='swalform' value="${team.name}" ${team.name === formData.team ? 'selected' : ''}>${team.name}</option>`).join('')}
                    </select>
                </div>
            `,
            focusConfirm: false,
            customClass: {
                popup: 'swalcontainer',
                confirmButton: 'swalbutton',
                cancelButton: 'swalbutton'
            },
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const profilePictureInput = document.getElementById('profilePicture');
                const bioInput = document.getElementById('bio').value;
                const teamInput = document.getElementById('team').value;

                return new Promise((resolve) => {
                    if (profilePictureInput.files.length > 0) {
                        const file = profilePictureInput.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve({
                                profilePicture: reader.result,
                                bio: bioInput,
                                team: teamInput
                            });
                        };
                        reader.readAsDataURL(file);
                    } else {
                        resolve({
                            profilePicture: formData.profilePicture,
                            bio: bioInput,
                            team: teamInput
                        });
                    }
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { profilePicture, bio, team } = result.value;
                setFormData((prevState) => ({
                    ...prevState,
                    profilePicture,
                    bio,
                    team
                }));

                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.map(user => user.email === formData.email ? { ...formData, profilePicture, bio, team } : user);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.setItem('Usuário Atual', JSON.stringify({ ...formData, profilePicture, bio, team }));
                console.log('Perfil Atualizado:', { ...formData, profilePicture, bio, team });
            }
        });
    };

    if (isLoggedIn) {
        const selectedTeam = teams.find(team => team.name === formData.team);
        return (
            <div className='p-5 md:px-10'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-5'>
                    <img className='rounded-full w-14 md:w-28' src={formData.profilePicture || User} alt='profile photo'/>
                        <h1 className='text-azul-claro text-2xl md:text-4xl lg:text-5xl'>{formData.username}</h1>
                    </div>
                    <div className='flex items-center gap-6'>
                        <button className='text-azul-marinho text-2xl md:text-4xl hover:text-azul-claro' onClick={handleEditProfile}>
                            <MdOutlineEdit/>
                        </button>
                        <button className='text-azul-marinho text-2xl md:text-4xl hover:text-azul-claro' onClick={handleLogout}>
                            <CiLogout/>
                        </button>
                    </div>
                </div>
                <p className='mt-3 text-gray-300 break-words break-all'>{formData.bio || 'Sua bio vem aqui!'}</p>
                <p className='mt-2 text-2xl md:text-4xl mb-4' style={{ color: selectedTeam?.color }}>{formData.team}</p>

                <div className='flex justify-between p-8'>
                    <button onClick={() => handleTabChange('posts')}>Posts</button>
                    <button onClick={() => handleTabChange('liked')}>Curtidos</button>
                    <button onClick={() => handleTabChange('saved')}>Salvos</button>
                </div>

                <div>
                    {activeTab === 'posts' && <div>Mostrar posts do usuário</div>}
                    {activeTab === 'liked' && <div>Mostrar posts curtidos</div>}
                    {activeTab === 'saved' && <div>Mostrar posts salvos</div>}
                </div>
            </div>
        );
    } 
    
    return <AuthForm onLogin={handleLogin} onRegister={handleRegister} teams={teams} />
        
};

export default Profile;