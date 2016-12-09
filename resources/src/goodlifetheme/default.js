import 'plone';

import 'slick-carousel/slick/slick.min.js';
import './js/main.js';

import './default.less';
import './theme.scss';
import './tinymce.css';

import jQuery from 'jquery';  // Expose jQuery for convenience
window.jQuery = jQuery;

window.require = undefined;  // Fix @@search
