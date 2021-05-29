db = openDatabase('pharmacy', '1.0', 'db pharm', 5 * 1024 * 1024);

function additem() {
    
    var itemname = document.getElementById("itemname").value;
    var quantity = document.getElementById("quantity").value;
    var picture = document.getElementById("item_picture").value;
    db.transaction(function (tx) {
        let x = 0;
        tx.executeSql('SELECT * FROM Items ', [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                if (results.rows.item(i).Name == itemname) {
                    alert("Item Is Already Found");
                    x += 1;
                }

            }
            if (x == 0) {
                tx.executeSql('INSERT INTO Items (Name,Quantity,Picture) VALUES (?,?,?)', [ itemname, quantity, picture]);
                alert("Successfully Add");
            }

        })
    })
}

function goto() {
    window.location.href = "invoice.html";
}

var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#showscreenshot");
document.getElementById("videoElement").style.background = "#DDD";
document.getElementById("videoElement").style.width = "300px";
document.getElementById("videoElement").style.height = "200px";
document.getElementById("showscreenshot").style.width = "300px";
document.getElementById("showscreenshot").style.height = "200px";


function capture() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                alert("Something went wrong!");
            });
    }
};

function takescreenshot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    var img_based_64 = canvas.toDataURL();
    document.getElementById("item_picture").value=img_based_64;
    console.log(img_based_64);
};


function stop() {
    var stream = video.srcObject;
    var tracks = stream.getTracks();
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }
    video.srcObject = null;
}




