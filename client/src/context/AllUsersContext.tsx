import { createContext } from "react";

export const AllUsersContext = createContext({
    allUsers: [],
    toggleFollowUser: (userID: string) => { }
})
