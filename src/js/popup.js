import render from '../templates/friends.hbs'        

function popupOpen(obj, myMap, coordMouse, clusterer, hintContent) {
    console.log('start');
    let popupReviewsList = document.querySelector('.popup__list');
    let adress = document.querySelector('.popup__header-adress');
    let popup = document.querySelector('.popup');
    let popupClose = document.querySelector('.popup__close');
    
    adress.textContent = obj.adress;
  
    let [posX, posY] = [...coordMouse];
    console.log(posX);
    console.log(posY);
  
    popup.style.display='block';
    popup.style.top = `${posY}px`;
    popup.style.left = `${posX}px`;      
       
    popupClose.addEventListener('click', ()=> {
       hidePopup(obj, popup);
    });

    clusterer.balloon.events.add('open', function (e) {
       hidePopup(obj, popup);
    });

    DnD(popup);

    addFeedback(obj, myMap, coordMouse, clusterer, popupReviewsList, hintContent);     
}

function hidePopup(obj, popup) {
    popup.style.display='none';
    obj.coords[0] = '';
    obj.coords[1] = '';
    obj.comments = [];
    document.querySelector('.user-name').value = '';
    document.querySelector('.place').value = '';
    document.querySelector('.reviews-text').value = '';  
}

function addFeedback(obj, myMap, coordMouse, clusterer, popupReviewsList, hintContent) {
    let data = {};
    let mas = [];
    let userName = document.querySelector('.user-name');
    let addButton = document.querySelector('.button__add');
    let place = document.querySelector('.place');
    let reviews = document.querySelector('.reviews-text');  
   
    popupReviewsList.innerHTML = hintContent;

    if (popupReviewsList.innerHTML == 0) {
        popupReviewsList.innerHTML = 'Нет отзывов...'
    }

    addButton.addEventListener('click', (e)=> {       
        e.preventDefault();
        if ((userName.value && place.value && reviews.value) === '') {
            alert('Заполните все поля');
            return;
        };
        data = {};
        data.coords = obj.coords,
        data.adress = obj.adress,      
        data.userName = userName.value;
        data.place = place.value;
        data.reviews = reviews.value;       
        data.dataRev = new Date().toLocaleString();        
        //mas.push(data);
        obj.comments.push(data);
        let arr =  obj.comments;
        console.log(obj.comments);        
        popupReviewsList.innerHTML = render({arr});
       /*
        userName.value = '';
        place.value = '';
        reviews.value = '';                
        */ 
        setTimeout(() => {
            userName.value = '';
            place.value = '';
            reviews.value = '';         
        }, 50)

        createPlacemark(obj, myMap, coordMouse, clusterer, popupReviewsList, data);
        
    });       
}

function createPlacemark(obj, myMap, coordMouse, clusterer, popupReviewsList, data) {
    console.log('Метка создана');
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: popupReviewsList.children[0].innerHTML,
        balloonContentName: data.userName,
        balloonContentAdress: data.adress,
        balloonContentBody: data.reviews,
        balloonContentHeader: data.place,
        balloonContentFooter: data.dataRev,
        balloonContentCoords: data.coords

    }, {
        preset: 'islands#violetDotIcon',
        openHintOnHover: false,
        draggable: false,
        hideIconOnBalloonOpen: false,
        hasBalloon: false
    });    

    myMap.geoObjects.add(myPlacemark);
    clusterer.add(myPlacemark);
    
    myPlacemark.events.add('click', () => {
        console.log('_data.hintContent ' + myPlacemark.properties._data.hintContent);
        console.log(obj.coords);
        popupOpen(obj, myMap, coordMouse, clusterer, myPlacemark.properties._data.hintContent);
        });        
    }

    function DnD(popup) {
        let popupHeader = document.querySelector('.popup__header-adress');
        popupHeader.onmousedown = function(e) {

            var coords = getCoords(popup);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;
          
            popup.style.position = 'absolute';
            document.body.appendChild(popup);
            moveAt(e);
          
            popup.style.zIndex = 1000; // над другими элементами
          
            function moveAt(e) {
              popup.style.left = e.pageX - shiftX + 'px';
              popup.style.top = e.pageY - shiftY + 'px';
            }
          
            popupHeader.onmousemove = function(e) {
              moveAt(e);
            };
          
            popupHeader.onmouseup = function() {
                popupHeader.onmousemove = null;
                popupHeader.onmouseup = null;
            };
          
          }
          
          popup.ondragstart = function() {
            return false;
          };
          
          function getCoords(elem) {   // кроме IE8-
            var box = elem.getBoundingClientRect();
            return {
              top: box.top + pageYOffset,
              left: box.left + pageXOffset
            };
        }
    }

export {
    popupOpen    
}