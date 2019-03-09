/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

addCookie();

function parseCookie() {
    let result = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value; 

        return prev;    
    }, {});

    return result;  
}

function isMatching(full, chunk) {
    const res = (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) ? true : false;

    return res;
}

function filterCookie() {
    let cook = parseCookie();
    let length = Object.keys(cook).length;
    let name = Object.keys(cook);
    let cookies = {};
    let value = filterNameInput.value;    

    for (let i=0; i<length; i++) {
        if (isMatching(name[i], value) || isMatching(cook[name[i]], value)) {
            cookies[name[i]] = cook[name[i]];     
        } else if (value.length===0) {
            cookies[name[i]] = cook[name[i]];
        }
    }

    return cookies;
}

function addCookie() {
    let cookie = filterCookie();
    let length = Object.keys(cookie).length;
    let name = Object.keys(cookie);

    listTable.textContent = '';
    
    for (let i=0; i<length; i++) {
        
        let tr = document.createElement('tr');

        listTable.appendChild(tr);

        let tdName = document.createElement('td');

        tr.appendChild(tdName);
        tdName.textContent = name[i];
        
        let tdValue = document.createElement('td');

        tr.appendChild(tdValue);
        tdValue.textContent = cookie[name[i]];

        const deleteButton = document.createElement('button');

        tr.appendChild(deleteButton);
        deleteButton.textContent = 'удалить';
        
        deleteButton.addEventListener('click', () => {
            listTable.removeChild(tr);
            document.cookie = `${name[i]}=; expires=Thu, 01 Jan 2000 00:00:01 GMT;`;
        });
    }
}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    addCookie();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    addCookie();
});