let elapse = 0; 
let period;

$(document).ready(function() {
    $("#dateCal").val(new Date().toISOString().substring(0, 10));

    $("#start").click(async function() {
        await startTimer();
    });

    $("#stop").click(async function() {
        await stopTimer();
    });

    $("#reset").click(async function() {
        await resetTimer();
    });
});

const resetTimer = () => {
    return new Promise((resolve) => {
        clearInterval(period);
        elapse = 0;
        displayTimer();
        $("#dateCal").val(new Date().toISOString().substring(0, 10)); 
        period = null;
        resolve();
    });
};

const startTimer = () => {
    return new Promise((resolve) => {
        if (period) {
            return resolve();
        }
        period = setInterval(() => {
            elapse++;
            displayTimer();
        }, 1000);
        resolve();
    });
};

const stopTimer = () => {
    return new Promise((resolve) => {
        clearInterval(period);
        period = null;
        resolve();
    });
};

function displayTimer() {
    const hours = Math.floor(elapse / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapse % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(elapse % 60).toString().padStart(2, '0');
    $("#displayTimeID").val(`${hours}:${minutes}:${seconds}`);
}

