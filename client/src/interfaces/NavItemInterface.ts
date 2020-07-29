export interface NavItemInterface {
    isAuth?: boolean,
    routeName: string,
    routeAuth: string,
    routeNotAuth: string,
    setLogoutModal?: (logoutModal: boolean) => void,
    logoutModal?: boolean,
    exact: boolean,
}
