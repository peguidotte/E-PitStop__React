import React from 'react';

const Profile = () => {
    const profile = {
        name: 'Patricia',
        email: 'patricia@example.com',
        bio: 'Software developer with a passion for creating amazing applications.'
    };

    return (
        <div>
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Bio: {profile.bio}</p>
        </div>
    );
};

export default Profile;