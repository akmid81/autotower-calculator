'use strict'
let form = document.querySelector("#autotower");
let showButton = form.querySelector("#show_form");
let cancelButton = form.querySelector("#cancel");
let postForm = form.querySelector("#post");

showButton.addEventListener('click', showPost);
cancelButton.addEventListener('click', removePost);

function showPost() {
   postForm.style.top = "40%";
   form.addEventListener('submit', sendOrder);
}

function removePost() {
   postForm.style.top = "-999px";
   form.removeEventListener('submit', sendOrder);
}

let order = {
   calculate(e) {
      order.type = +form.elements.tower_type.value;
      order.hours = +form.elements.hour.value;
      order.x = (+form.elements.out.value) ? +form.elements.km.value : 0;

      if (e) {
         if (e.target == form.elements.item2) {
            form.elements.km.removeAttribute('disabled');
         } else if (e.target == form.elements.item1) {
            form.elements.km.setAttribute('disabled', true);
         };
      };

      switch (order.type) {
         case 14:
         case 16:
            form.elements.hour.min = 2;
            order.cost = ((order.hours == 2) ? 3000
               : (order.hours == 8) ? 9000
                  : (3000 + (order.hours - form.elements.hour.min) * 1200)) + order.x * 100;
            break;
         case 22:
            form.elements.hour.min = 3;
            if (+form.elements.hour.min > order.hours) order.hours = form.elements.hour.value = +form.elements.hour.min;
            order.cost = ((order.hours == 3) ? 5000
               : (order.hours == 8) ? 12000
                  : (5000 + (order.hours - form.elements.hour.min) * 1500)) + order.x * 100;
            break;
         case 24:
            form.elements.hour.min = 3;
            if (+form.elements.hour.min > order.hours) order.hours = form.elements.hour.value = +form.elements.hour.min;
            order.cost = ((order.hours == 3) ? 5500
               : (order.hours == 8) ? 14000
                  : (5500 + (order.hours - form.elements.hour.min) * 1750)) + order.x * 100;
            break;
         case 26:
            form.elements.hour.min = 3;
            if (+form.elements.hour.min > order.hours) order.hours = form.elements.hour.value = +form.elements.hour.min;
            order.cost = ((order.hours == 3) ? 6500
               : (order.hours == 8) ? 16000
                  : (6500 + (order.hours - form.elements.hour.min) * 2000)) + order.x * 100;
            break;
         case 28:
            form.elements.hour.min = 4;
            if (+form.elements.hour.min > order.hours) order.hours = form.elements.hour.value = +form.elements.hour.min;
            order.cost = ((order.hours == 4) ? 9000
               : (order.hours == 8) ? 16000
                  : (9000 + (order.hours - form.elements.hour.min) * 2000)) + order.x * 100;
            break;
         case 32:
            form.elements.hour.min = 4;
            if (+form.elements.hour.min > order.hours) order.hours = form.elements.hour.value = +form.elements.hour.min;
            order.cost = ((order.hours == 4) ? 10000
               : (order.hours == 8) ? 18000
                  : (10000 + (order.hours - form.elements.hour.min) * 2250)) + order.x * 100;
            break;
         case 34:
            form.elements.hour.min = 4;
            if (+form.elements.hour.min > order.hours) order.hours = form.elements.hour.value = +form.elements.hour.min;
            order.cost = ((order.hours == 4) ? 12000
               : (order.hours == 8) ? 20000
                  : (12000 + (order.hours - form.elements.hour.min) * 2500)) + order.x * 100;
            break;
         default:
            order.cost = 0;
      };

      form.querySelector("#sum").innerText = order.cost;
   }
};
order.calculate();

form.addEventListener('change', order.calculate);

async function sendOrder(e) {
   e.preventDefault();

   order.check = form.elements.check.value;

   if ((order.check != "")
      || (!form.elements.name.value)
      || !(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(form.elements.tel.value))) return;

   order.name = form.elements.name.value;
   order.tel = form.elements.tel.value;

   console.log(JSON.stringify(order));

   //Отправка данных формы к файлу обработчику contact-form.php
   let response = await fetch('files/contact-form.php', {
      method: 'POST',
      body: JSON.stringify(order)
   });

   if(!response.ok) {
      message('red', 'Ошибка отправки');
      return;
   };

   let result = await response.json();

   if (result) {
      message('#b1f1b1', 'Заявка отправлена');
      form.reset();
   } else {
      message('#ff8d00', 'Ошибка отправки');
   };

   function message(color, text) {
      let msg = document.createElement('div');
      postForm.append(msg);

      msg.style.padding = "20px 10px";
      msg.style.color = color;
      msg.innerText = text;

      setTimeout(() => msg.remove(), 4000);
   }
}
