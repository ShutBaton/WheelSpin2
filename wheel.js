let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let turnsCompleted = 0;

let startupSound = new Audio('wheel_startup.mp3');
let winSound = new Audio('wheel_win.mp3');

let bias = 0;

const spinValue = {
    1: { minRot: 350, maxRot: 26, prize: "You've won £1!" },
    10: { minRot: 26, maxRot: 62, prize: "Your mystery item... was £0. Try again?" },
    9: { minRot: 62, maxRot: 98, prize: "Sorry... Try Again?" },
    8: { minRot: 98, maxRot: 134, prize: "No way... 2 ENTRIES TO A £20 GIFT CARD RAFFLE!!!" },
    7: { minRot: 134, maxRot: 170, prize: "IS THAT 3 ENTRIES??? TO WIN A £10 GIFT CARD!!!" },
    6: { minRot: 170, maxRot: 206, prize: "Woah! That is an entry to the £10 gift card raffle!" },
    5: { minRot: 206, maxRot: 242, prize: "You've won a free go on one of our games!" },
    4: { minRot: 242, maxRot: 278, prize: "You've won a sweet! Go claim one!" },
    3: { minRot: 278, maxRot: 314, prize: "Sorry... Try again?" },
    2: { minRot: 314, maxRot: 350, prize: "You've won £2!!!" }
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function returnPrize(rot){
    for(let i = 1; i<=10; i++){
        if(rot >= spinValue[i].minRot && rot < spinValue[i].maxRot){
            return spinValue[i].prize;
        }
    }
    return "CRITICAL ISSUE!";
}

function GetRand(bias) {
    if (bias === 1) {
        const minRot = spinValue[2].minRot;
        const maxRot = spinValue[2].maxRot;
        return randomIntFromInterval(minRot, maxRot-1);

    } 
    else if (bias === -1) {
        const sorryOptions = [3, 9, 10];
        const selectedOption = sorryOptions[Math.floor(Math.random() * sorryOptions.length)];
        const minRot = spinValue[selectedOption].minRot;
        const maxRot = spinValue[selectedOption].maxRot;
        return randomIntFromInterval(minRot, maxRot-1);
    }
    else {
        return Math.random() * 360;
    }
}

spinBtn.onclick = function() {
    SpinWheel();
};

function SpinWheel() {
    wheel.style.transform = "rotate(0deg)";
    const randomRotation = GetRand(bias);
    turnsCompleted += (Math.ceil(Math.random() * 10) * 360);
    startupSound.play();
    wheel.style.transform = "rotate(" + (randomRotation + turnsCompleted) + "deg)";
    const prize = returnPrize(randomRotation);
    setTimeout(() => {
        document.querySelector('#prize').innerHTML = prize;
        winSound.play();
    }, 5000);
    setTimeout(() => {
        document.querySelector('#prize').innerHTML = "Spin the Wheel!";
    }, 10000);
}

document.addEventListener("keydown", function onEvent(event) {
    if (event.key === "ArrowLeft") {
        bias = -1;
    }
    else if (event.key === "ArrowRight") {
        bias = 1;
    }
    else if (event.key === "ArrowDown") {
        bias = 0;
    } 
    else{
        SpinWheel();
        alert(bias);
    }
});