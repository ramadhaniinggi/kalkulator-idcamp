const cache_key = "history_calculation";

function check() {
    return typeof (Storage) !== 'undefined';
}

function saveHistory(data) {
    if (check()) {
        let historyData = null;
        if (localStorage.getItem(cache_key) === null) {
            historyData = [];
        } else {
            // json.parse = mengubah nilai objek dalam string ke dalam objek javascript
            historyData = JSON.parse(localStorage.getItem(cache_key));
        }
        // fungsi array/method
        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }
        // json.stringify = mengubah nilai objek javascript ke dalam string
        localStorage.setItem(cache_key, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (check()) {
        return JSON.parse(localStorage.getItem(cache_key)) || [];

    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    // hapus konten html agar data tidak ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";


        historyList.appendChild(row);
    }
}

renderHistory();