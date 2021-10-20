// Leaflet によるCS立体図の表示デモ
// on 20 Oct. 2021 bu Hiromu Daimaru
// 地図の透過表示には下記のdayjournal様による技術を使用しています
// https://github.com/dayjournal/Leaflet.Control.Opacity
let initcx = 130.7289012886808;
let initcy = 33.38540391721503;
let initZoomlv = 10;

// Map 読み込み
// let map = L.map("map", {
//     keyboard: true,
//     boxZoom: true,
//     minZoom: 1,
//     maxZoom: 18,
//     doubleClickZoom: true,
//     scrollWheelZoom: true,
//     touchZoom: true,
// });		

// CS立体図 読み込み
let csmap = new
L.tileLayer("Asakura2017/{z}/{x}/{y}.png");

// 地理院地図 読み込み
let gsi_std = new
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",{
    attribution: '<a href="http://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
});

// 地理院オルソ 読み込み
let gsi_ort = new
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg",{
    attribution: '<a href="http://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
});


//地質図ラベルの表示
let labelLayer = L.tileLayer.betterWms('https://gbank.gsj.jp/ows/seamlessgeology200k_b' ,{
    layers: 'label',
    format: 'image/png',
    transparent : true,
    opacity: 1.0,
    zIndex: 1000,
    attribution: '<a href="https://www.gsj.jp/license/index.html" target="_blank">GSJ, AIST</a>'
});

//地質図ラインの表示
var lineLayer = L.tileLayer.betterWms('https://gbank.gsj.jp/ows/seamlessgeology200k_b' ,{
    layers: 'line',
    format: 'image/png',
    transparent : true,
    opacity: 0.8,
    zIndex: 3000,
    attribution: '<a href="https://www.gsj.jp/license/index.html" target="_blank">GSJ, AIST</a>'
});

//地質図の表示
let detailLayer = L.tileLayer.betterWms('https://gbank.gsj.jp/ows/seamlessgeology200k_b' ,{
    layers: 'area',
    format: 'image/png',
    transparent : true,
    opacity: 0.7,
    zIndex: 2000,
    attribution: '<a href="https://www.gsj.jp/license/index.html" target="_blank">GSJ, AIST</a>'
});

//MAP
let map = L.map('map', {
    center: [initcy, initcx],
    zoom: initZoomlv,
    minZoom: 6,
    maxZoom: 14,
    zoomControl: true,
    layers: [csmap],
});

//表示中心位置とズームレベル
map.setView([initcy, initcx], initZoomlv);

//BaseLayer
const Map_BaseLayer = {
    'CS立体図': csmap,
};

//AddLayer
const Map_AddLayer = {
    '地質図': detailLayer,
    '地質図（ライン）': lineLayer,
    '地質図（ラベル）': labelLayer,
    '地理院地図（標準）': gsi_std,
    '地理院オルソ写真': gsi_ort,
};

//LayerControl
L.control
    .layers(Map_BaseLayer, Map_AddLayer, {
        collapsed: false,
    })
    .addTo(map);

//OpacityControl
L.control
    .opacity(Map_AddLayer, {
        label: '透過度',
    })
    .addTo(map);
