document.addEventListener('DOMContentLoaded', function () {

const storage = document.querySelector("#storage");
const valueStorage = document.querySelector("#value-storage");

function onStorage () {
    if (storage.value) {
        valueStorage.innerHTML = storage.value;
        onRenderCharts();
    }
}

storage.addEventListener("input", onStorage);

const transfer = document.querySelector("#transfer");
const valueTransfer = document.querySelector("#value-transfer");

function onTransfer () {
    if (transfer.value) {
        valueTransfer.innerHTML = transfer.value;
        onRenderCharts();
    }
}

transfer.addEventListener("input", onTransfer);

const charts = document.querySelectorAll('.j-chart');

function onRenderCharts() {
    for (let i = 0; i < charts.length; i++) {
        const chart = charts[i];
        const type = chart.dataset.type;
        const position = chart.dataset.position;
        const minValue = chart.dataset.value;
        const HTMLLine = chart.querySelector('.j-line');
        const HTMLValue = chart.querySelector('.j-value');
        let _value = 0;
        if (type === 'vultr') {
            _value = onCalcVultr(minValue);
        }
        if (type === 'scaleway') {
            _value = onCalcScaleway();
        }
        if (type === 'bunny') {
            _value = onCalcBunny();
        }
        if (type === 'backblaze') {
            _value = onCalcBackblaze(minValue);
        }
        if (type === "") {
            _value = onCalcBackblaze(minValue);
        }
        HTMLValue.innerHTML = _value;
        position === 'vertical' ? HTMLLine.style.height = `${_value * 2}px` : HTMLLine.style.width = `${_value * 2}px`;
    }
}

function onCalcVultr (minValue = 0) {
    const priceStorage = 0.01 * storage.value;
    const priceTransfer = 0.01 * transfer.value;
    let res = priceStorage + priceTransfer;
    if (res <= minValue) {
        return minValue;
    }
    return res;
}

const multi = document.getElementById("multi");
const multiV = document.getElementById("multiV");
const single = document.getElementById("single");
const singleV = document.getElementById("singleV");

multi.addEventListener('input', () => {
  onRenderCharts();
});
single.addEventListener('input', () => {
    onRenderCharts();
});
multiV.addEventListener('input', () => {
  onRenderCharts();
});
singleV.addEventListener('input', () => {
    onRenderCharts();
});

function onCalcScaleway () {
    const priceStorageMulti = storage.value <= 75 ? 0 : 0.06 * (storage.value - 75);
    const priceStorageSingle = storage.value <= 75 ? 0 : 0.03 * (storage.value - 75);
    const priceTransfer = transfer.value <= 75 ? 0 : 0.02 * (transfer.value - 75);
    let res = 0;
    if (multi.checked || multiV.checked) {
        res = priceStorageMulti + priceTransfer;
    }
    if (single.checked || singleV.checked) {
        res = priceStorageSingle + priceTransfer;
    }
    return res < 0 ? 0 : res;
}

const hdd = document.getElementById("hdd");
const hddV = document.getElementById("hddV");
const ssd = document.getElementById("ssd");
const ssdV = document.getElementById("ssdV");

function onCalcBunny () {
    const priceStorageHDD = 0.01 * storage.value;
    const priceStorageSSD = 0.02 * storage.value;
    const priceTransfer = 0.01 * transfer.value;
    let res = 0;
    if (hdd.checked || hddV.checked) {
        res = priceStorageHDD + priceTransfer;
    }
    if (ssd.checked || ssdV.checked) {
        res = priceStorageSSD + priceTransfer;
    }
    return res >= 10 ? 10 : res;
}

hdd.addEventListener('input', () => {
    onRenderCharts();
});

ssd.addEventListener('input', () => {
    onRenderCharts();
});
hddV.addEventListener('input', () => {
    onRenderCharts();
});

ssdV.addEventListener('input', () => {
    onRenderCharts();
});

function onCalcBackblaze (minValue = 0) {
    const priceStorage = 0.005 * storage.value;
    const priceTransfer = 0.01 * transfer.value;
    let res = priceStorage + priceTransfer;
    if (res <= minValue) {
        res = minValue;
    }
    return res;
}
    onRenderCharts();
});