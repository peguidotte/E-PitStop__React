import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import '../pages/Profile.css';

const AuthForm = ({ onLogin, onRegister, teams }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const storedUser = users.find(user => user.email === loginData.email && user.password === loginData.password);
        if (storedUser) {
            onLogin(storedUser);
        } else {
            Swal.fire('Erro', 'Email ou senha incorretos', 'error');
        }
    };

    const openRegister = () => {
        Swal.fire({
            title: 'Cadastro',
            html: `
                <div class="flex flex-col">
                    <input type="text" id="username" class="swal2-input swalform" placeholder="Username" required />
                    <input type="text" id="phone" class="swal2-input swalform" placeholder="Cel (DDD+número)" required />
                    <input type="email" id="email" class="swal2-input swalform" placeholder="Email" required />
                    <input type="password" id="password" class="swal2-input swalform" placeholder="Senha" required />
                    <select id="team" class="swal2-input swalform">
                        <option value="" class="opacity-50 swalform">Time favorito</option>
                        ${teams.map(team => `<option value="${team.name}">${team.name}</option>`).join('')}
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
            confirmButtonText: 'Cadastrar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#username').value;
                const phone = Swal.getPopup().querySelector('#phone').value;
                const email = Swal.getPopup().querySelector('#email').value;
                const password = Swal.getPopup().querySelector('#password').value;
                const team = Swal.getPopup().querySelector('#team').value;
                

                // Validação de email e username existentes
                const existingUser = JSON.parse(localStorage.getItem('users')) || [];
                if(existingUser.some(user => user.email === email)){
                    Swal.showValidationMessage('Já existe uma conta com esse email')
                    return false;
                }
                if(existingUser.some(user => user.username === username)){
                    Swal.showValidationMessage('Usuário existente, tente outro nome')
                    return false
                }

                // Validação do telefone (DDD + número)
                const phoneRegex = /^\d{2}\d{8,9}$/;
                if (!phoneRegex.test(phone)) {
                    Swal.showValidationMessage(`Phone number must include DDD and be 10-11 digits long`);
                    return false;
                }

                // Validação da senha (mínimo 6 caracteres)
                if (password.length < 6) {
                    Swal.showValidationMessage(`Password must be at least 6 characters long`);
                    return false;
                }

                return { username, phone, email, password, team };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onRegister(result.value);
            }
        });
    };

    return (
        <div className='flex flex-col justify-center items-center h-[95%] py-10 gap-6'>
            <h1 className='text-azul-claro text-3xl uppercase text-center'>Bem-vindo de volta!</h1>
            <form onSubmit={handleLogin} className='flex flex-col items-center'>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginInputChange} required />
                <input type="password" name="password" placeholder="Senha" value={loginData.password} onChange={handleLoginInputChange} required minLength="6" />
                <button type="submit" 
                className='bg-azul-escuro rounded-xl mt-3 text-2xl py-2 px-6 hover:px-7 hover:py-3 duration-500'>
                    Entrar
                </button>
            </form>
            <h2 className='mt-5'>Ainda não tem uma conta?</h2>
            <button onClick={openRegister} 
            className='bg-azul-escuro rounded-xl mt-3 text-2xl p-2 px-6 hover:px-7 hover:py-3 duration-500'>
                Cadastre-se
            </button>
        </div>
    );
};

AuthForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    teams: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired
};

export default AuthForm;
