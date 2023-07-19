const generate = () => {
    const length = 40;
    let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "123456789";
    base += number;
    const randomPassword = generateRandomPassword(base, length)
    return randomPassword;
}

const generateRandomPassword = (base, length) => {
    let password = "";
    for (let x = 0; x < length; x++) {
        const randomPassword = Math.floor(Math.random() * base.length);
        password += base.charAt(randomPassword);
    }
    return password;
}

module.exports = generate;