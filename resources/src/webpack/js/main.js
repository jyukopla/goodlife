import jQuery from 'jquery';

jQuery(($) => {

  $(document).ready(function()
  {
    $('.carousel-test').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
      });
  });

});
