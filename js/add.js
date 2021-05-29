var db = openDatabase('pharmacy', '1.0', 'db pharm', 5 * 1024 * 1024);

function adduser() {
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passhash = CryptoJS.MD5(password).toString(); /*To hash Password*/
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO Login (UserName,Password) VALUES (?,?)', [ username, passhash]);
    })
}
function goto() {
    window.location.href = "item.html";
}