import PropTypes from 'prop-types';

const Post = ({ post }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <div>
            <div>
                <img src={currentUser.profilePicture}/>
                <p>{currentUser.username}</p>
            </div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {post.images.map((image, index) => (
                <img key={index} src={image}/>
            ))}
            <p>Posted on: {new Date(post.timestamp).toLocaleString()}</p>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string),
        timestamp: PropTypes.number.isRequired
    }).isRequired
};

export default Post;