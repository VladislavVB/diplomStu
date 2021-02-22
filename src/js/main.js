$(document).ready(function () {
  var form = $('.modal'),
      formBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close');
  
  formBtn.on('click', function () {
    form.toggleClass('modal--visible');    
  });
  closeBtn.on('click', function () {
    form.toggleClass('modal--visible');
  });

  var form1 = $('.info-modal--bread'),
      formBtn1 = $('[data-toggle="info-modal--bread"]'),
      closeBtn1 = $('.info-modal--bread__close');
  
  formBtn1.on('click', function () {
    form1.toggleClass('info-modal--bread--visible');    
  });
  closeBtn1.on('click', function () {
    form1.toggleClass('info-modal--bread--visible');
  });

  var form2 = $('.info-modal--bread-small'),
      formBtn2 = $('[data-toggle="info-modal--bread-small"]'),
      closeBtn2 = $('.info-modal--bread-small__close');
  
  formBtn2.on('click', function () {
    form2.toggleClass('info-modal--bread-small--visible');    
  });
  closeBtn2.on('click', function () {
    form2.toggleClass('info-modal--bread-small--visible');
  });

  var form3 = $('.info-modal--buns'),
  formBtn3 = $('[data-toggle="info-modal--buns"]'),
  closeBtn3 = $('.info-modal--buns__close');

  formBtn3.on('click', function () {
  form3.toggleClass('info-modal--buns--visible');    
  });
  closeBtn3.on('click', function () {
  form3.toggleClass('info-modal--buns--visible');
  });

  var form4 = $('.info-modal--confectionery'),
  formBtn4 = $('[data-toggle="info-modal--confectionery"]'),
  closeBtn4 = $('.info-modal--confectionery__close');

  formBtn4.on('click', function () {
  form4.toggleClass('info-modal--confectionery--visible');    
  });
  closeBtn4.on('click', function () {
  form4.toggleClass('info-modal--confectionery--visible');
  });

  var form5 = $('.info-modal--crispbreads'),
  formBtn5 = $('[data-toggle="info-modal--crispbreads"]'),
  closeBtn5 = $('.info-modal--crispbreads__close');

  formBtn5.on('click', function () {
  form5.toggleClass('info-modal--crispbreads--visible');    
  });
  closeBtn5.on('click', function () {
  form5.toggleClass('info-modal--crispbreads--visible');
  });

  var form6 = $('.info-modal--muesli'),
  formBtn6 = $('[data-toggle="info-modal--muesli"]'),
  closeBtn6 = $('.info-modal--muesli__close');

  formBtn6.on('click', function () {
  form6.toggleClass('info-modal--muesli--visible');    
  });
  closeBtn6.on('click', function () {
  form6.toggleClass('info-modal--muesli--visible');
  });

  var mySwiper = new Swiper ('#swiper-container', {
    noSwiping:true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  });

  var mySwiper1 = new Swiper ('#swiper-container-about', {
    noSwiping:true,
    loop:true,
    pagination: {
      el: '.swiper-pagination-about',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next-about',
      prevEl: '.swiper-button-prev-about',
    },
    
  });

  //Переменная для включения/отключения индикатора загрузки
  var spinner = $('.ymap-container').children('.loader');
  //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
  var check_if_load = false;
  //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
  var myMapTemp, myPlacemarkTemp;
  
  //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
  function init () {
    var myMapTemp = new ymaps.Map("map-yandex", {
      center: [55.794737, 37.701954], // координаты центра на карте
      zoom: 15, // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp = new ymaps.Placemark([55.794737, 37.701954], {
        balloonContentHeader: 'Проба',
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'img/map-marker.png',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map-marker.png',
        // Размеры метки.
        iconImageSize: [32, 32],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-25, -50],
    });
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
    myMapTemp.behaviors.disable('scrollZoom');
    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);
  
    // Решение по callback-у для определения полной загрузки карты
    waitForTilesLoad(layer).then(function() {
      // Скрываем индикатор загрузки после полной загрузки карты
      spinner.removeClass('is-active');
    });
  }
  
  // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      var tc = getTileContainer(layer), readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function() {
          resolve();
        });
      }
    });
  }
  
  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
          || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }
  
  // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
  function loadScript(url, callback){
    var script = document.createElement("script");
  
    if (script.readyState){  // IE
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" ||
                script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  // Другие браузеры
      script.onload = function(){
        callback();
      };
    }
  
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  
  // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
  var ymap = function() {
    $('.ymap-container').mouseenter(function(){
        if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
  
        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
          check_if_load = true; 
  
      // Показываем индикатор загрузки до тех пор, пока карта не загрузится
          spinner.addClass('is-active');
  
      // Загружаем API Яндекс.Карт
          loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
            // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
            ymaps.load(init);
          });                
        }
      }
    );  
  }
  
  $(function() {
  
    //Запускаем основную функцию
    ymap();
  
  });

  //Валидация формы
  function validateForm(form){
    $(form).validate({
      errorClass: "invalid",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        userPhone: "required",
        userPhone: {
          required: true,
          minlength: 17,
          maxlength: 400
        },
        // compound rule
        userEmail: {
          required: true,
          email: true
        }
      },
      errorElement: "div",
      messages: {
        userName: {
          required: "Имя обязательно",
          minlength: "Имя не короче 2 букв",
          maxlength: "Имя не длиннее 10 букв"
        },
        userPhone: "Телефон обязателен",
        userEmail: {
          required: "Обязательно укажите email",
          email: "Введите в формате name@domain.com"
        }
      },
    });
  }
  validateForm('.modal__form');
  validateForm('.hero__form');
  validateForm('.offering__form');
  /* маска для телефона */
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "Ваш номер телефона:"});

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '349',
      width: '100%',
      videoId: 'lyGqyFxBHfM',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }
});