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
            <h1 className="text-2xl font-bold mb-4">Posts for you</h1>
            <ListPost filteredPosts={initialPosts} enablePost/>
        </div>
    );
}

export default Foryou;
