module.exports = function() {
    var data = { users: [] }
    // Create 1000 users
    for (var i = 0; i < 1000; i++) {
        data.users.push({ id: i, user: 'user' + i, password: '123456' })
    }
    return data
};