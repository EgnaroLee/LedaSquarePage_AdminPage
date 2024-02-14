function search() {
    var input = document.getElementById("search_input").value.toLowerCase();
    var catecory = document.getElementById("search_category").value.toLowerCase();

    var rows = document.querySelectorAll("#data_table tbody tr");

    rows.forEach(function (row) {
        var cells = row.querySelectorAll("td");
        var found = false;
        cells.forEach(function (cell, index) {
            if ((catecory === "daytime" && index === 0) ||
                (catecory === "theme" && index === 1) ||
                (catecory === "name" && index === 2) ||
                (catecory === "number" && index === 3)) {
                if (cell.textContent.toLowerCase().indexOf(input) > -1) {
                    found = true;
                }
            }
        });
        if (found) {
            row.style.display = "";
        }
        else {
            row.style.display = "none";
        }
    });
}

document.getElementById("search_input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        search();
    }
});