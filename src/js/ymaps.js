import { popupOpen } from './popup'

function initMap() {
  ymaps.ready(() => {
      var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7      
    });

    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
      '<div class=ballon_content>' +
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<a class=ballon_adress href ="#"'+
        ' data-coords={{properties.balloonContentCoords|raw}}> {{ properties.balloonContentAdress|raw }}</a>'+
          '<div class=ballon_body >{{ properties.balloonContentBody|raw }}</div>' +
          '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>' +
      '</div>'
    );
    
    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      // Используем макет "карусель"
      clusterBalloonContentLayout: "cluster#balloonCarousel",
      clusterBalloonItemContentLayout: customItemContentLayout,
      // Запрещаем зацикливание списка при постраничной навигации.
      clusterBalloonCycling: false,
      // Настройка внешнего вида панели навигации.
      // Элементами панели навигации будут маркеры.
      //clusterBalloonPagerType: "marker",
      // Количество элементов в панели.
      clusterBalloonPagerSize: 6
    });

    myMap.geoObjects.add(clusterer);
       
    myMap.events.add('click', function (e) {
      var coords = e.get('coords');
      var coordMouse = e.get('position');
      
      //console.log(coords, coordMouse);
      getAddress(myMap, coordMouse, clusterer, coords);
    });
  });     
}
  
  // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(myMap, coordMouse, clusterer, coords) {
     
      ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);
          let obj = {};
          obj.coords = coords;
          console.log('координаты по клику ' + obj.coords)
          obj.adress = firstGeoObject.getAddressLine();
          obj.comments = [];
          popupOpen(obj, myMap, coordMouse, clusterer, ' ');
      });  
    }   
 
export {
  initMap
}