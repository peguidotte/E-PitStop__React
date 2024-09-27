import data from '../../assets/postsUser.json';
import { useNavigate } from 'react-router-dom'

function HomeCommunities() {
    const navigate = useNavigate()

    return (

        <div className="max-w-3xl mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">Teams</h1>
            <ul>
                {data.grupos.map(grup => {
                    return (
                        <li key={grup.id} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
                            <h2 className="text-xl text-gray-800 font-semibold">{grup.nome}</h2>
                            <p className="mt-2 text-gray-700">{data.posts.filter(x => x.grupo_id === grup.id).length}</p>
                            <button
                                className="bg-azul-escuro rounded-xl mt-3 text-2xl p-2 px-6 hover:px-7 hover:py-3 duration-500"
                                onClick={() => navigate(`/Communitie/${grup.id}`)}
                            >
                                Entrar
                            </button>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    );
}

export default HomeCommunities;