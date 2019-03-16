function initMap() {
  ymaps.ready(() => {
      var myPlacemark;
      var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });

    myMap.events.add('click', function (e) {
      var coords = e.get('coords');

      // Если нет – создаем.      
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', function () {
            getAddress(myPlacemark.geometry.getCoordinates());
        });      
      getAddress(coords);
      });

  // Создание метки.
    function createPlacemark(coords) {
      return new ymaps.Placemark(coords,  {
          preset: 'islands#violetDotIcon',
          draggable: false
      });
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
  });
}


export {
  initMap
}