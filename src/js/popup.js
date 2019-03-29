import render from '../templates/friends.hbs'
   
    let popupClose = document.querySelector('.popup__close');
    let popup = document.querySelector('.popup');    

function popupOpen(obj, myMap, coordMouse, clusterer, hintContent) {
    let popupReviewsList = document.querySelector('.popup__list');    
    
    let [posX, posY] = [...coordMouse];
      console.log(posX);
      console.log(posY);
  
     popup.style.display='block';
     popup.style.top = `${posY}px`;
     popup.style.left = `${posX}px`;      
       
    popupClose.addEventListener('click', ()=> {
 popup.style.display='none';    
   });

   dragAnddrop()

  
/*
    function masRev() {        
    data.userName = userName.value;
    data.place = place.value;
    data.reviews = reviews.value;   
    data.dataRev = new Date().toLocaleDateString();
    data.coords = coord;
    mas.push(data);
    data = {};
    return (mas);
   }   
  
    addButton.addEventListener('click', (e)=> {
        e.preventDefault();
        masResult = masRev();
        console.log(masResult);
        popupReviewsList.innerHTML = render({apidata: masResult});        
    });

    //createPlacemark(obj, myMap, coordMouse, clusterer, popupReviewsList);
*/
    
   /*
    userName.value = '';
    place.value = '';
    reviews.value = '';
*/
    popupReviewsList

    addFeedback(obj, myMap, coordMouse, clusterer, popupReviewsList, hintContent);
    
}


function addFeedback(obj, myMap, coordMouse, clusterer, popupReviewsList, hintContent) {
    let data = {};
    let mas = [];
    let userName = document.querySelector('.user-name');
    let addButton = document.querySelector('.button__add');
    let place = document.querySelector('.place');
    let reviews = document.querySelector('.reviews-text');    
   
    popupReviewsList.innerHTML = hintContent;
    console.log('HINT ' + hintContent);
/*
    if (!reviews.length) {
        popupReviewsList.textContent = 'Нет отзывов...'
    }
    */
    addButton.addEventListener('click', (e)=> {       
        e.preventDefault();
        if ((userName.value && place.value && reviews.value) === '') {
            alert('Заполните все поля');
            return;
        };
        data = {};
        console.log('клик');
        data.coords = obj.coords,
        data.adress = obj.adress,      
        data.userName = userName.value;
        data.place = place.value;
        data.reviews = reviews.value;       
        data.dataRev = new Date().toLocaleDateString();
        
        //mas.push(data);
        obj.comments.push(data);
        console.log(obj.comments);
        let arr =  obj.comments;
        popupReviewsList.innerHTML = render({arr});
        //console.log( 'popupReviewsList.innerHTML ' + popupReviewsList.innerHTML);
        /*
        userName.value = '';
        place.value = '';
        reviews.value = '';
        */      
        createPlacemark(obj, myMap, coordMouse, clusterer, popupReviewsList, data);       
    });       
}

function createPlacemark(obj, myMap, coordMouse, clusterer, popupReviewsList, data) {
    let popupItemPlace = document.querySelector('.popup__item-place');
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: popupReviewsList.children[0].innerHTML,
        //popupoonContent: obj.adress + popupReviewsList.children[0].innerHTML,
        baloonContentName: data.userName,
        baloonContentAdress: data.adress,
        popupoonContentBody: data.reviews,
        popupoonContentHeader: data.place,
        popupoonContentFooter: data.dataRev

    }, {
        preset: 'islands#violetDotIcon',
        openHintOnHover: false,
        draggable: false
    });    
    console.log(myPlacemark.properties);
    myMap.geoObjects.add(myPlacemark);
    clusterer.add(myPlacemark);   
    
    myPlacemark.events.add('click', () => {
        popupOpen(obj, myMap, coordMouse, clusterer, myPlacemark.properties._data.hintContent);
        });
    }

    function dragAnddrop() {
        let popupHeader = document.querySelector('.popup__header');
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