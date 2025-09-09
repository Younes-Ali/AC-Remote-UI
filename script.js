const tempSpan = document.getElementById('temp');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const powerBtn = document.getElementById('power');
const fanBtn = document.getElementById('fan');
const fanSpeedDiv = document.getElementById('fan-speed');
const screenDiv = document.querySelector('.screen');
const fanFa = document.getElementById('fan-fa');

let temp = 24;
let isOn = false;
let fanSpeed = 1;

function updateFanSpeed() {
    fanSpeedDiv.textContent = `Fan Speed: ${fanSpeed}`;
    fanFa.classList.remove('animate__animated', 'animate__rotateIn', 'animate__infinite', 'animate__faster', 'animate__fast', 'animate__slower');
    fanFa.style.animation = '';
    if (isOn) {
        let speed = '2s';
        if (fanSpeed === 2) speed = '1.2s';
        if (fanSpeed === 3) speed = '0.7s';
        fanFa.style.animation = `spinFan ${speed} linear infinite`;
    }
}

function animateTemp(direction) {
    tempSpan.classList.remove('animate__animated', 'animate__fadeInRight', 'animate__fadeInLeft');
    void tempSpan.offsetWidth;
    if (direction === 'right') {
        tempSpan.classList.add('animate__animated', 'animate__fadeInRight');
    } else {
        tempSpan.classList.add('animate__animated', 'animate__fadeInLeft');
    }
}

function setEnabled(enabled) {
    upBtn.disabled = !enabled;
    downBtn.disabled = !enabled;
    fanBtn.disabled = !enabled;
    if (enabled) {
        screenDiv.classList.add('active');
        fanSpeedDiv.style.opacity = 1;
        updateFanSpeed();
    } else {
        screenDiv.classList.remove('active');
        fanSpeedDiv.style.opacity = 0;
        fanSpeedDiv.textContent = '';
        fanFa.style.animation = '';
    }
}

powerBtn.onclick = () => {
    isOn = !isOn;
    powerBtn.classList.toggle('on', isOn);
    setEnabled(isOn);
    updateFanSpeed();
};

upBtn.onclick = () => {
    if (!isOn) return;
    if (temp < 30) {
        temp++;
        tempSpan.textContent = temp + '°';
        animateTemp('right');
    }
};
downBtn.onclick = () => {
    if (!isOn) return;
    if (temp > 16) {
        temp--;
        tempSpan.textContent = temp + '°';
        animateTemp('left');
    }
};
fanBtn.onclick = () => {
    if (!isOn) return;
    fanSpeed = fanSpeed < 3 ? fanSpeed + 1 : 1;
    updateFanSpeed();
};

setEnabled(false);