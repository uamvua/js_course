import { popupOpen } from './popup'

let popupForm = document.querySelector('.popup');
//let popupReviewsList = document.querySelector('.popup__list');

function initMap() {
  ymaps.ready(() => {
      //var myPlacemark;
      var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });

    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
      
      '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
          '< class=ballon_name>{{ properties.baloonContentName|raw }}</>' +
          '< class=ballon_adress>{{ properties.baloonContentAdress|raw }}</>' +
          '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
          '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );
    
    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      // Используем макет "карусель"
      clusterBalloonContentLayout: "cluster#balloonCarousel",
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
      console.log(coords, coordMouse);      
      
      //popupOpen(myMap, coordMouse, clusterer, coords);
      getAddress(myMap, coordMouse, clusterer, coords);
      //popupOpen(obj, myMap, doordMouse, clusterer, )
/*
      detectCoord();

      function detectCoord() {
        let [posX, posY] = [...coordMouse];
        console.log(posX);
        console.log(posY);

        popupForm.style.display='block';
        popupForm.style.top = `${posY}px`;
        popupForm.style.left = `${posX}px`;

         getAddress(coords);
        //popupOpen(coords);
             

    } */
/*
      // Если нет – создаем.      
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        clusterer.add(myPlacemark);

        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', function () {
            getAddress(myPlacemark.geometry.getCoordinates());
        });      
       
        console.log(myPlacemark.properties);

        myPlacemark.events.add('click', function () {
          coords = e.get('coords');
          coordMouse = e.get('position');
          detectCoord()
        });
*/
      });     
    }); 
     
  }
  /*
  // Создание метки.
    function createPlacemark(coords) {
      return new ymaps.Placemark(coords,  {
          //hintContent: popupReviewsList.children[3].innerHTML,
          //balloonContent: obj.address + popupReviewsList.children[3].innerHTML
        }, {
          preset: 'islands#violetDotIcon',
          openHintOnHover: false,
          draggable: false
      })
    }
*/
  // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(myMap, coordMouse, clusterer, coords) {
      ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);
          let adress = document.querySelector('.popup__header-adress');
          let obj = {};
          /*
          // Формируем строку с данными об объекте.
          [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            //Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),          
          //console.log(firstGeoObject.getAddressLine());
          //adress.textContent = firstGeoObject.getAddressLine(); */
          obj.coords = coords;
          obj.adress = firstGeoObject.getAddressLine();
          obj.comments = [];
          adress.textContent = obj.adress;
          console.log('obj.coords ' + obj.coords);
          popupOpen(obj, myMap, coordMouse, clusterer, ' ');
      });
      
    }

    function detectCoord(coord, coordMouse) {

    };
 
export {
  initMap
}