const UserStorage = (() => {
    const getUsers = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    const filterPasswords = (users) => {
        return users.map(({ password, ...rest }) => rest);
    };

    return {
        getMessages: () => {

            const messages = localStorage.getItem('messages');
            return messages ? JSON.parse(messages) : [];
        },
        saveMessage: (message) => {

            const messages = UserStorage.getMessages();
            messages.push(message);
            localStorage.setItem('messages', JSON.stringify(messages));
        },
        getUsersList: () => {

            const users = getUsers();
            return filterPasswords(users);
        },
        saveUser: (user) => {

            const users = getUsers();
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        },
        emailExists: (email, id = null) => {

            const users = getUsers();
            return users.some(user => user.email === email && (id === null || user.id !== id));
        },
        findUser: (email, password) => {

            const users = getUsers();
            return users.find(user => user.email === email && user.password === password);
        },
        saveUserToSession: (user) => {
            sessionStorage.setItem('user', JSON.stringify(user));
        },
        getUserFromSession: () => {

            const user = sessionStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        },
        clearSession: () => {

            sessionStorage.removeItem('user');
        },
        getUserById: (id) => {

            const users = getUsers();
            const user = users.find(user => user.id == id);
            if (user) {
                const { password, ...rest } = user;
                return rest;
            }
            return null;
        },
        updateUser: (updatedUser) => {

            let users = getUsers();
            users = users.map(user => {
                if (user.id == updatedUser.id) {
                    return {
                        ...user,
                        ...updatedUser,
                        password: updatedUser.password ? updatedUser.password : user.password,
                    };
                }
                return user;
            });
            localStorage.setItem('users', JSON.stringify(users));
        },
        deleteUser: (id) => {

            let users = getUsers();
            users = users.filter(user => user.id != id);
            localStorage.setItem('users', JSON.stringify(users));
        }
    };
})();

export default UserStorage;
