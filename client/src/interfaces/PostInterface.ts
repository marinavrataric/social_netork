export interface PostInterface {
    _id: string;
    content: string;
    registration_date: string;
    comments: [
        {
            id: string;
            text: string;
            userID: {
                first_name: string;
                last_name: string;
                profile_image: string;
                _id: string;
                followers: [string];
                following: [string];
            };
        },
    ];
    likes: [string];
    userID: {
        first_name: string;
        last_name: string;
        profile_image: string;
        _id: string;
        followers: [string];
        following: [string];
    };
    visibility: string;
}
