let db;
var count=0;

function loadPage() {

    db = openDatabase("Auto", "0.1", "A list of auto", 500000);
    if (!db) {
        alert("Failed to connect to database.");
    } else {
        console.log("connected to bd");
    }

    db.transaction(function (tx) {
        tx.executeSql("SELECT COUNT(*) FROM Auto", [], null, function (tx, error) {
            tx.executeSql("CREATE TABLE Auto (id INTEGER PRIMARY KEY, fio TEXT, number INT, time INT, name TEXT)",
                [], null, null);
        })
    });

    let auto = new Auto();

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM Auto", [], function (tx, result) {
            auto.addFunction(result);
        }, null)
    });

}

class Auto {
    constructor() {
        this.id = null;
        this.fio = null;
        this.number = null;
        this.time = null;
        this.name = null;
        this.set = new Set();
    }

    set setCurrentData(value) {
    [this.fio, this.number, this.time, this.name, this.tel] = value.split('!');
    }

    get getCurrentData() {
        return `${this.set}`;
    }

    addFunction(result) {
        for (let i = 0; i < result.rows.length; i++) {
            this.set.add(result.rows.item(i));
        }
    }

    DataAdd(tx) {
        if (count===0) {
            tx.executeSql("INSERT INTO Auto (fio,number,time,name) values(?, ?, ?, ?)",
                [this.fio, this.number, this.time, this.name], null, null);
        }else {tx.executeSql("INSERT INTO Auto (fio,number,time,name,telephone) values(?, ?, ?, ?, ?)",
            [this.fio, this.number, this.time, this.name, this.tel], null, null);}
        }
}


function addNewRow() {
    let newData = document.getElementById("fio_").value + '!'
        + document.getElementById('number_').value + '!'
        + document.getElementById('time').value + '!'
        + document.getElementById('name').value;
    console.log("NEW DATA" + newData);
        if (count===1){ newData+='!'+document.getElementById("tel").value;}
    let auto = new Auto();

    auto.setCurrentData = newData;
    console.log("Data array: " + newData);
    console.log(auto);
    db.transaction(function (tx) {
        auto.DataAdd(tx);
    });
}

function clearForm() {
    document.getElementById("myForm").reset();
}

function clearSelect() {
    document.getElementById("mySelect").innerHTML = '';
}

function addID() {
    clearSelect();
    var selectedObject = document.myForm.mySelect;

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM Auto", [], function (tx, result) {
            console.log(result);
            for (let i = 0; i < result.rows.length; i++) {
            selectedObject.options[selectedObject.options.length] = new Option(result.rows.item(i)['id']);
            }
        }, null)
    });

}

function deleteID() {
    let selectedObject = document.myForm.mySelect;

    if (selectedObject.selectedIndex !== -1) {
        let id = selectedObject.options[selectedObject.selectedIndex].value;
        console.log("id for delete " + id);
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM Auto WHERE id = ?", [id], null, null)
        });
    }
}

function showTable() {
    addID();

    let table = document.getElementById("myTable");
    if (count===0)
    table.innerHTML = '<tr><th>id</th><th>FIO</th><th>Number</th><th>Time</th><th>Name</th></tr>';
else table.innerHTML = '<tr><th>id</th><th>FIO</th><th>Number</th><th>Time</th><th>Name</th><th>tel</th></tr>';
    let auto = new Auto();

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM Auto", [], function (tx, result) {

            for (let i = 0; i < result.rows.length; i++) {

                let row = document.createElement("tr");
                table.appendChild(row);

                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");

                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);


                td1.innerHTML = result.rows.item(i)['id'];
                td2.innerHTML = result.rows.item(i)['fio'];
                td3.innerHTML = result.rows.item(i)['number'];
                td4.innerHTML = result.rows.item(i)['time'];
                td5.innerHTML = result.rows.item(i)['name'];
                if (count===1){
                    let td6= document.createElement("td");
                    row.appendChild(td6);
                    td6.innerHTML= result.rows.item(i)["telephone"];
                }

            }
        }, null)
    });
}

function minmax(){
        let table = document.getElementById("myTable");
    table.innerHTML = '<tr><th>FIO</th><th>time</th></tr>';
    
    var auto = new Auto();

    db.transaction(function (tx) {
        tx.executeSql("SELECT fio,time FROM Auto ORDER BY time DESC", [], function (tx, result) {

                var row1 = document.createElement("tr");
                table.appendChild(row1);

                var td1 = document.createElement("td");
                var td2 = document.createElement("td");

                row1.appendChild(td1);
                row1.appendChild(td2);

                td1.innerHTML = result.rows.item(0)['fio'];
                td2.innerHTML = result.rows.item(0)['time'];

                var row2 = document.createElement("tr");
                table.appendChild(row2);

                var td3 = document.createElement("td");
                var td4 = document.createElement("td");

                row2.appendChild(td3);
                row2.appendChild(td4);

                td3.innerHTML = result.rows.item(result.rows.length-1)['fio'];
                td4.innerHTML = result.rows.item(result.rows.length-1)['time'];

        }, null)
    });

}
function newProperty() {

    let obj = new Auto();
    let name= "tel";

    obj[name] = "telephone";
    if(count===0){
        const form = document.getElementById("myForm");
        form.innerHTML += "<label>\n" +
            "Телефон <input class = \"input-style\" maxlength=\"30\" type=\"tel\" name=\"valueProp\" id=\"tel\"><p/>\n" +
            "</label>";

        db.transaction(function (tx) {
           tx.executeSql("ALTER TABLE Auto\n" +
               " ADD telephone",[],null,null);

        });

        count++;
    }else {db.transaction(function (tx) {
        tx.executeSql("DROP TABLE Auto;",[],null,null); alert("tel deleted");

    })}

    console.log("Name of property : " + name);
    console.log("Value of property : " + obj[name])


}

function f(){
    db.transaction(function (tx) {
        document.getElementById("myForm").reset();
    })
}


