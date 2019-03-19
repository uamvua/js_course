import render from '../templates/friends.hbs'

function popupOpen(coord) {

   let popupReviewsList = document.querySelector('.popup__list');
   let userName = document.querySelector('.user-name');
   let place = document.querySelector('.place');
   let reviews = document.querySelector('.reviews-text');
   let popupClose = document.querySelector('.popup__close')
   let addButton = document.querySelector('.button__add'); 
   let popupForm = document.querySelector('.popup');
   let data = {};
   let mas = [];
   let masResult;   
  
   popupClose.addEventListener('click', ()=> {
    popupForm.style.display='none';    
   });

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

   if (!reviews.length) {
        popupReviewsList.textContent = 'Нет отзывов...'
   }
   
    userName.value = '';
    place.value = '';
    reviews.value = ''; 
   
}


export {
    popupOpen      
}