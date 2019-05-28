'use strict';

const templateList = document.getElementById('template-product-list').innerHTML;
const results = document.getElementById('result');
let listItems = '';
let coordinates = [];
const elem = document.querySelector('.main-carousel');
const progressBar = document.querySelector('.progress-bar')
const button = document.getElementById('button');


Mustache.parse(templateList);

for (let i = 0; i < productsData.length; i++) {
  listItems += Mustache.render(templateList, productsData[i]);
  coordinates.push(productsData[i].coords);
}

results.insertAdjacentHTML('beforeend', listItems);

const flkty = new Flickity(elem, {
  // options
  hash: true,
  pageDots: false,
  cellAlign: 'left',
  contain: true
});

flkty.on('scroll', function (progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + '%';
});

button.addEventListener('click', function () {
  flkty.select(0)
});

window.initMap = function () {
  let markers = [];
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: coordinates[0]
  });

  for (let l = 0; l < coordinates.length; l++) {
    markers[l] = new google.maps.Marker({
      position: coordinates[l],
      map: map
    });

    markers[l].addListener('click', function() {
      flkty.select(l);
    });
  }

  flkty.on('change', function (index) {
    map.panTo(coordinates[index]);
    map.setZoom(4);
  });
};