if (!window.jQuery) {
  document.write('<script type="text/javascript" src="/js/lib/jquery.js"></script>')
}

$(document).ready(function () {



  var modal = $('.modal');
  var modalUp = $('.modal-up');

  var modalForm = $('.modal__form');
  var controlForm = $('.control__form');
  var footerForm = $('.footer__form');

  onSubmitForm(modalForm)
  onSubmitForm(controlForm)
  onSubmitForm(footerForm)

  $('[data-toggle=modal]').on('click', function () {
    modal.toggleClass('modal--visible');
  });

  $('.modal__close').on('click', function () {
    modal.toggleClass('modal--visible');
  });

  $('.modal-up__close').on('click', function () {
    modalUp.removeClass('modal-up--visible');
  });

  $(document).keydown(function () {
    if (event.keyCode == 27) {
      modal.removeClass('modal--visible');
      modalUp.removeClass('modal-up--visible');
    }
  });

  // slider
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 20 + bullets.width() + 20)
  bullets.css('left', prev.width() + 20)

  new WOW().init();

  modalForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    },
    rules: {

      userName: {
        required: true,
        minlength: 2
      },

      userPhone: {
        required: true,
        minlength: 17
      },

      userEmail: {
        required: true,
        email: true
      },

      policyCheckbox: "required",
    },
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      userEmail: {
        required: "Обязательно укажите Email",
        email: "Введите в формате: name@domain.com"
      },
      policyCheckbox: "Обязательно для заполнения",
    }
  });

  function onSubmitForm(form) {
    form.submit(function (event) {
      if (form.valid()) {
        event.preventDefault();
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(this).serialize(),
          success: function (response) {
            form[0].reset();
            $('.modal').removeClass('modal--visible');
            $('.modal-up').addClass('modal-up--visible');
            console.log(response)
            ym('56835025', 'reachGoal', 'submit'); return true

          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR + " " + textStatus);

          }
        });
      }
    });
  }

  controlForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    },
    rules: {
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      policyTick: "required",
    },
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      policyTick: "Обязательно для заполнения",
    }
  });

  footerForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    },
    rules: {

      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      userQuestion: "required",
      policyMark: "required",

    },
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      userQuestion: "Пожалуйста, напишите Ваш вопрос",
      policyMark: "Обязательно для заполнения",
    }
  });

  $('[type=tel]').mask('+7(000) 000-00-00', { placeholder: "Ваш номер телефона:" });

  //видео

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'ef0JqU-4dOc',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }

});


// Yandex карта
YaMapsShown = false;
YaMapsMinShown = false;
$(window).scroll(function () {
  if (!YaMapsShown) {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 700) {
      showYaMaps();
      YaMapsShown = true;
    }
  }
});

function showYaMaps() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ac5bb57cf85273372e734f7def62f256953ad064eedb76e5e5b9827bc18ec6a06&amp;width=100%25&amp;height=465&amp;lang=ru_RU&amp;scroll=false";
  document.getElementById("YaMaps").appendChild(script);
};

$(window).scroll(function () {
  if (!YaMapsMinShown) {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
      showYaMapsMin();
      YaMapsMinShown = true;
    }
  }
});

function showYaMapsMin() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9a60de6cf27682651fbcaac0fd23aa6bf89d1b64045e88a7b770168feac6baa2&amp;width=100%25&amp;height=255&amp;lang=ru_RU&amp;scroll=false";
  document.getElementById("YaMapsMin").appendChild(script);
}