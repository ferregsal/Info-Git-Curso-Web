async function getUsers() {
    const URL = 'https://dummyjson.com/users';

    const response = await fetch(URL, {
        method: 'GET',
        headers: {},
    });
    let data = '';
    if (response.ok) {
        data = await response.json();
    } else {
        throw new Error(`${response.status} - ${response.statusText}`);
    }
    console.log(data.users.length);
    return data.users;
}

try {
    const users = await getUsers();
    console.log(users);
} catch (error) {
    console.log(error.message);
}
