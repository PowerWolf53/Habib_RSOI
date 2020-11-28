var sch1=0;
var sch2=0;

function add() {
    var table = document.getElementById("myTable");

    var select = document.getElementById("place");
    var place = select.options[select.selectedIndex].value;

    var select2 = document.getElementById("words");
    var word = select2.options[select2.selectedIndex].value;

    var radio = document.getElementsByName("pl");


    if (radio[0].checked) {
        if (place == 1) {
            var newRow = table.insertRow(1);
            sch1++;
            for (var i = 0; i < table.rows[2].cells.length; i++) {
                var newCell = (newRow.insertCell(i).innerText = word );


            }
        } else if (place == 2) {
            var newRow = table.insertRow(table.rows.length);
            sch1++;
            for (var i = 0; i < table.rows[0].cells.length; i++) {
                var newCell = (newRow.insertCell(i).innerText = word);
            }
        }
    } else if (radio[1].checked) {
        if (place == "Справа") {
            var rows = table.getElementsByTagName("tr");
            sch2++;
            for (var i = 0; i < rows.length; i++) {
                rows[i].insertCell(-1).innerText = word;
            }
        } else if (place=="Слева"){
            var rows = table.getElementsByTagName("tr");
            sch2++;
            for (var i = 0; i < rows.length; i++) {
                rows[i].insertCell(0).innerText = word;
            }
        }
    }
    var val = document.getElementsByTagName("td");
    var val2 = document.getElementsByTagName("th");
    for (var i = 0; i < val.length; i++) {
        val[i].style.borderColor = "red";
        val[i].style.borderStyle = "solid";


    }
    for (var i = 0; i < val2.length; i++) {
        val2[i].style.borderColor = "red";
        val2[i].style.borderStyle = "solid";
    }


     alert(
        "Было добавлено " +
         sch1+
         " строк и " +
         sch2 +
         " столбцов."
     );
}


function deleteFirstRow() {
    var table = document.getElementById("myTable");
    table.deleteRow(0);
}

function deleteLastRow() {
    var table = document.getElementById("myTable");
    table.deleteRow(table.rows.length - 1);
}

