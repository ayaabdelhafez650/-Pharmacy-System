var db = openDatabase('pharmacy', '1.0', 'db pharm', 5 * 1024 * 1024);

db.transaction(function (pharm) {
    var passhash = CryptoJS.MD5("123").toString();
    pharm.executeSql('CREATE TABLE IF NOT EXISTS Login (UserName unique ,Password)');
    pharm.executeSql('INSERT INTO Login  VALUES ("Admin",?)',[passhash]);

});

db.transaction(function (pharm) {
    pharm.executeSql('CREATE TABLE IF NOT EXISTS Items (Name,Quantity,Picture)');
});

db.transaction(function (pharm) {
    pharm.executeSql('CREATE TABLE IF NOT EXISTS Invoice (ID unique ,Date ,CustomerName,Item,Quantity,Type)');
});
 

function access() {
    var count=0;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Login', [], function (tx, results) {
            var html = "<table>";
            for (var i = 0; i < results.rows.length; i++) {
                if (results.rows.item(i).UserName == document.getElementById("username").value &
                    results.rows.item(i).Password == CryptoJS.MD5(document.getElementById("password").value).toString()) {
                    window.location.href = "item.html";
                    count+=1;
                }
            } 
             if (count==0){alert("you are not a user");}    
        },null);    
    });
}



function goadduser() {
    console.log(CryptoJS.MD5(document.getElementById("password").value).toString() )
    console.log(CryptoJS.MD5(123).toString() )
    if (document.getElementById("username").value == "Admin" &
    CryptoJS.MD5(document.getElementById("password").value).toString() == CryptoJS.MD5("123").toString()) {

        window.location.href = "add.html";
    }
    else
    {
        alert('Sorry ,You are not Admin');
    }
}
