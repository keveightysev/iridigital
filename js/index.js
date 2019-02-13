const overallCont = document.getElementById('background');


function randomString() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`~!@#$%^&*()-=_+[]:;'<>/?.,"
    const strLength = 100000;
    let rString = '';
    for (let i = 0; i < strLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        rString += (chars.substring(randomNumber, randomNumber + 1) + ' ');
    }
    overallCont.textContent = rString;
}

randomString();