import { FollowUserInterface } from './FollowUserInterface';

export interface UserInterface {
    _id: string;
    first_name: string;
    last_name: string;
    user_bio: string;
    profile_image: string;
    following: Array<string>;
    followers: FollowUserInterface[];
}
