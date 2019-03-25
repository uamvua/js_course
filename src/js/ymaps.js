import { popupOpen } from './popup'

let popupForm = document.querySelector('.popup');
function initMap() {
  ymaps.ready(() => {
      var myPlacemark;
      var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });

    myMap.events.add('click', function (e) {
      var coords = e.get('coords');
      var coordMouse = e.get('position');

      detectCoord();

      function detectCoord() {
        let [posX, posY] = [...coordMouse];
        console.log(posX);
        console.log(posY);

        popupForm.style.display='block';
        popupForm.style.top = `${posY}px`;
        popupForm.style.left = `${posX}px`;

        popupOpen(coords);
        getAddress(coords);
      }
      

      // Если нет – создаем.      
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
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

      });
     
    }); 
     
  }
  
  // Создание метки.
    function createPlacemark(coords) {
      return new ymaps.Placemark(coords,  {
          //hintContent: popup.children[номер].innerHTML,
         // balloonContent: obj.address + popup.children[номер].innerHTML
        }, {
          preset: 'islands#violetDotIcon',
          openHintOnHover: false,
          draggable: false
      })
    }

  // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
      ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);
          let adress = document.querySelector('.popup__header-adress');        
          // Формируем строку с данными об объекте.
          [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            //Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),          
          console.log(firstGeoObject.getAddressLine());
          adress.textContent = firstGeoObject.getAddressLine();
      });
    }
 
export {
  initMap
}