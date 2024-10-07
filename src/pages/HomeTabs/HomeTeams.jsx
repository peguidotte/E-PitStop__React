import data from '../../assets/postsUser.json';
import ListPost from '../../components/ListPost';

function HomeTeams() {
    const filteredPosts = data.posts.filter(x => data.usuarios.find(u => u.id === x.usuario_id).tipo === "equipe")
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Teams</h1>
            <ListPost filteredPosts={filteredPosts} />
        </div>
    );
}

export default HomeTeams;