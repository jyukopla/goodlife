Theme mockup
------------

* start webpack development server

  .. code:: bash

     make watch

* edit mockup ``index.html`` and resource files in ``./resources/src/webpack``
* open preview from ``./resources/theme/webpack/index.html``
* CSS and JS changes are live-reloaded
* HTML changes require manual refresh


Plone integration
-----------------

* start Plone server

  .. code:: bash

     make serve

* open http://localhost:8080/
* click to create a new Plone site (username ``admin``, password ``admin``)
* create a new Plone-site with id ``Plone``
* open *admin* => *Site Setup* from toolbar
* open *Theming* control panel
* activate theme
* open http://localhost:8080/
