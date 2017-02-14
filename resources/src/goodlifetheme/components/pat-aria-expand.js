import Base from 'pat-base';
import $ from 'jquery';


export default Base.extend({
  name: 'aria-expand',
  trigger: '.pat-aria-expand',
  parser: 'mockup',

  init ($el, opts) {
    let $target;

    if (!$el.attr('aria-controls')) {
      $.error('No attribute "aria-controls" defined for "' + $el.prop('outerHTML') + '".');
      return
    }

    if ($el.attr('aria-controls')) {
      $target = $('#' + $el.attr('aria-controls'));
    } else {
      $target = $el;
    }

    if (!$target || $target.length === 0) {
      $.error('No target found for "#' + $el.attr('aria-controls') + '".');
      return
    }

    // Init ARIA state
    if ($el.attr('aria-expanded') === 'true' ||
        $target.attr('aria-hidden') === 'false') {
      $el.attr('aria-expanded', 'true');
      $target.attr('aria-hidden', 'fase');
    } else {
      $el.attr('aria-expanded', 'false');
      $target.attr('aria-hidden', 'true');
    }

    // Toggle ARIA state on event
    $el.on(opts.event || 'click', function(e) {
      if ($el.attr('aria-expanded') === 'true') {
        $el.attr('aria-expanded', 'false');
        $target.attr('aria-hidden', 'true');
      } else {
        $el.attr('aria-expanded', 'true');
        $target.attr('aria-hidden', 'false');
      }
      e.stopPropagation();
      e.preventDefault();
    });
  }
});
