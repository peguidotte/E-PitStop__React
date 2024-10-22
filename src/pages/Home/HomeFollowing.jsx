import { NavLink } from 'react-router-dom';
import data from '../../assets/postsUser.json';
import ListPost from '../../components/ListPost';

const Following = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return (        
        <div className="max-w-3xl mx-auto p-4">
            {user ? (
                <ListPost filteredPosts={data.posts.filter(x => data.following.includes(x.usuario_id))} enablePost/>
            ) : (
                <div>
                    <NavLink to={'/profile'}>
                        <p>Faça login</p>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default Following;