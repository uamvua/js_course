function initMap() {
  ymaps.ready(() => {
    var mapMosc = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });
  });
}

export {
  initMap
}