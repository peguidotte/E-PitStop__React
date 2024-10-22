import data from '../../assets/postsUser.json';
import ListPost from '../../components/ListPost';

function Foryou() {
    const initialPosts = [...data.posts];
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
        const postsArray = JSON.parse(savedPosts);
        initialPosts.push(...postsArray);
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <ListPost filteredPosts={initialPosts} enablePost/>
        </div>
    );
}

export default Foryou;
