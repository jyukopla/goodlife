import 'slick-carousel/slick/slick.min.js';

import './components/pat-aria-expand';

import jQuery from 'jquery';

// This imports Slick Carousel JS from NPM modules
// Slick needs jQuery as an dependency, that is the reason
// why this is imported here, not in authenticate.js file

import 'slick-carousel';
import './comments';

jQuery(($) => {
  // This controls the slick carousel, add additional settings here
  // https://github.com/kenwheeler/slick/
  $('.hero-area__carousel-wrapper').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    nextArrow: null, //'<button type="button" class="slick-next"></button>', // null to remove buttons
    prevArrow: null, //'<button type="button" class="slick-prev"></button>', // null to remove buttons
  });

  function moveToAnchor() {
    if (window.location.hash) {
      const target = $(window.location.hash);
      if (target.length) {
        $('html, body').animate({scrollTop: target.offset().top - 60}, 0);
      }
    }
  }
  $(window).on('hashchange', moveToAnchor);
});

import './theme.scss';
