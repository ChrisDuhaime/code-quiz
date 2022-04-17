let ol = document.getElementById('highScoresList');
let data = localStorage.getItem('data');
let parsedData = JSON.parse(data);
let sortedData = sortComplexArrDesc(parsedData, 'score')

for (let x = 0; x < sortedData.length; x++) {
    let currentItem = sortedData[x];
    let li = document.createElement('li');
    li.innerHTML = currentItem.initials + ' - ' + currentItem.score;
    ol.appendChild(li);
}

let clearButton = document.getElementById('clearScoresBtn');
clearButton.addEventListener('click', clearScores)

function sortComplexArrDesc(arr, prop) {
    arr.sort(function (a, b) {
        return b[prop] - a[prop];
    });
    return arr;
}

function clearScores() {
    localStorage.clear();
}