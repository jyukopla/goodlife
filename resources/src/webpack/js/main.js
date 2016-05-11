import jQuery from 'jquery';


// This imports Slick Carousel JS from NPM modules
// Slick needs jQuery as an dependency, that is the reason
// why this is imported here, not in authenticate.js file

import 'slick-carousel';

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
        nextArrow: null, //'<button type="button" class="slick-next"></button>', // null to remove
        prevArrow: null, //'<button type="button" class="slick-prev"></button>', // null to remove
      });
  });

});
