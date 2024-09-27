import data from '../../assets/postsUser.json';
import ListPost from '../../components/ListPost';

function Foryou() {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts for you</h1>
            <ListPost filteredPosts={data.posts} />
        </div>
    );
}

export default Foryou;
