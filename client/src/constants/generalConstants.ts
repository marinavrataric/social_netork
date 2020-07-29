export const storedToken = localStorage.getItem('token');

export const config = {
    headers: {
        'x-auth-token': `${storedToken}`,
        'Content-Type': 'application/json',
    }
}