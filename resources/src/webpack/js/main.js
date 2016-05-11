import jQuery from 'jquery';

jQuery(($) => {

  $(document).ready(function()
  {

    // This controls the slick carousel, add additional settings here
    // https://github.com/kenwheeler/slick/
    $('.carousel-test').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>'
      });
  });

});
