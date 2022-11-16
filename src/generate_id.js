function generate_id() {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789€#%$£@*?';
    for ( var i = 0; i < 32; i++ ) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token
}
module.exports = generate_id
