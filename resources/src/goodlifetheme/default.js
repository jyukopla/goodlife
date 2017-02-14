import 'plone';
import './icons.less';
import './default.less';
import './theme';

// Expose jQuery for convenience
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

// Fix @@search
window.require = undefined;
