import data from '../../assets/postsUser.json';
import ListPost from '../../components/ListPost';

const Following = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return (        
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Following</h1>
            {user ? (
                <ListPost filteredPosts={data.posts.filter(x => data.following.includes(x.usuario_id))} enablePost/>
            ) : (
                <div>
                    <p>Faça login</p>
                </div>
            )}
        </div>
    );
}

export default Following;