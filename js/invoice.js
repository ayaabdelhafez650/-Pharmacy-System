db = openDatabase('pharmacy', '1.0', 'db pharm', 5 * 1024 * 1024);
var chB = 0;

function add() {
    if (chB == 1) {
        var id = document.getElementById("id").value;
        var date = document.getElementById("date").value;
        var customername = document.getElementById("customername").value;
        var item = document.getElementById("item").value;
        var quantities = document.getElementById("quantities").value;
        db.transaction(function (tx) {
            if (document.getElementById("sell").checked) {
                tx.executeSql('INSERT INTO Invoice (ID ,Date ,CustomerName,Item,Quantity,Type) VALUES (?,?,?,?,?,?)', [id, date, customername, item, quantities, "Sell"]);
            }
            else {
                tx.executeSql('INSERT INTO Invoice (ID ,Date ,CustomerName,Item,Quantity,Type) VALUES (?,?,?,?,?,?)', [id, date, customername, item, quantities, "Buy"]);
            }
            alert("Invoice is added");
        })
    }
    else { alert("Please Check Before Invoice"); }
}

function checkF() {
    chB=1;
    if (document.getElementById("sell").checked==true) {
        db.transaction(function (tx) {
            var count = 0;
            tx.executeSql('SELECT * FROM Items ', [], function (tx, results) {
                var html = "<table>";
                for (var i = 0; i < results.rows.length; i++) {
                    if (results.rows.item(i).Name == document.getElementById("item").value &&
                        results.rows.item(i).Quantity >= document.getElementById("quantities").value) {
                        alert('Items You Want is Found');
                        var x = results.rows.item(i).Quantity - document.getElementById("quantities").value;
                        tx.executeSql('update Items set Quantity=? where Name=? ', [x, results.rows.item(i).Name]);
                        alert("Sucessfully Sell");
                        count = 1;
                    }
                }
                if (count == 0) { alert("Item Not Found"); }
            }, null);
        });
    }
    else {
        db.transaction(function (tx) {
            var count1 = 0;
            tx.executeSql('SELECT * FROM Items ', [], function (tx, results) {
                var html = "<table>";
                for (var i = 0; i < results.rows.length; i++) {
                    if (results.rows.item(i).Name == document.getElementById("item").value) {
                        var x = parseInt(results.rows.item(i).Quantity) + parseInt(document.getElementById("quantities").value);
                        tx.executeSql('update Items set Quantity=? where Name=? ', [x, results.rows.item(i).Name]);
                        alert("Sucessfully Buy");
                        count1++;
                    }
                }
                if (count1 == 0) {
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO Items (Name,Quantity,Picture) VALUES (?,?,?)', [document.getElementById("item").value, document.getElementById("quantities").value, "BFInvoice"]);
                        alert("New Item Is Added");

                    })
                }

            }, null);
        });
    }
}

