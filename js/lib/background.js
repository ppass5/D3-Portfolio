/**
 * @name background.js
 * get from http://www.hys-inc.jp
 */

(function ($) {
    var Background = function($el) {

    ///////////////////////////////////////

    // values
    var options = $.extend({
            color: '',
            bgColor: '#FFF',
            size: 1,
            depthTest: false,
            transparent: true,
            image: '',
            space: true,
            fadeIn: 3000,
            delay: 1000
          }, $el.data());

    var i, j, k,
        ww, wh,
        renderer, scene, camera, canvas, ctx,
        $container = $el,
        cUpdateID,
        rotAry = [],
        values = [],
        total = 0,
        mousePos = {
          x: 0,
          y: 0
        };
    var cameraPos = {
      x: 0,
      y: 0,
      z: 0,
      dx: 0,
      dy: 0,
      dz: 0
    };
    var particle,
        pGeometry, pMaterial,
        pcount = 5000,
        dDistance = 600,
        dRotX = 0,
        dRotY = 0,
        cameraMode = true,
        debugMode = false,
        defaultCamera = $container.type ? $container.type : "manual",
        ch, gh,
        range = 1500;
    ///////////////////////////////////////
    // constructor
    var constructor = function() {
      $(function() {
        threeSetup();
        setResizeHandler();
      });
    };

    var threeSetup = function() {
      $container.css({visibility: 'hidden'});
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, $el.width() / $el.height(), 0.1, 1500);
      camera.lookAt(scene.position);

      // WebGL
      if (window.WebGLRenderingContext) {
        renderer = new THREE.WebGLRenderer();
      }
      // CANVAS
      else {
        renderer = new THREE.CanvasRenderer();
        if (isSmartDevice()) {}
      }

      // setup
      renderer.setSize($el.width(), $el.height());
      renderer.setClearColor(options.bgColor, 1.0);
      $container[0].appendChild(renderer.domElement);
      canvas = $('> canvas', $container);
      ctx = (canvas[0].getContext) ? canvas[0].getContext('2d') : 'undefined';

      setupPerticle();
      renderStart();
    }

    var setResizeHandler = function() {
      resize();
      $(window).bind('resize', function(e) {
        resize(e);
      });
    }

    var resize = function(e) {
      ww = $el.width();
      wh = $el.height();

      if (camera) {
        camera.aspect = $el.width() / $el.height();
        camera.updateProjectionMatrix();
        renderer.setSize($el.width(), $el.height());
      }
    }

    var setupPerticle = function() {
      // cube
      var g = new THREE.Geometry();
      g.before = [];
      g.verticesNeedUpdate = true;

      for (var i = 0; i < pcount; i++) {
        var v = new THREE.Vector3();
        g.before[i] = [];

        var rand1 = Math.random();
        var rand2 = Math.random();

        var theta1 = 360 * rand1 * Math.PI / 180;
        var theta2 = ( 180 * rand2 - 90 ) * Math.PI / 180;
        var radius = 380;

        v.x = radius * Math.cos(theta2) * Math.sin(theta1);
        v.y = radius * Math.sin(theta2);
        v.z = radius * Math.cos(theta2) * Math.cos(theta1);

        g.before[i].t1 = rand1;
        g.before[i].t2 = rand2;
        g.vertices.push(v);
      }



      var map = THREE.ImageUtils.loadTexture(options.image),
          particleOptions = {
            color: options.color,
            size: parseFloat(options.size),
            depthTest: options.depthTest,
            transparent: options.transparent
          };
      if (options.image !='') {
        particleOptions.map = map;
      }
      var m = new THREE.ParticleSystemMaterial(particleOptions);

      var p = new THREE.ParticleSystem(g, m);
      scene.add(p);

      pGeometry = g;
      pMaterial = m;
      particle = p;

    }

    var setupKeydown = function() {
      $(window).bind('keydown', function(e) {
        if (options.space) {
          keydownHandler(e);
        }
      });
    }

    var keydownHandler = function(e) {
      var key = e.keyCode;
      if (key == 32) {
        debugMode = (debugMode) ? false : true;
        updateDebugMode();
      }
      return false;
    }

    var updateDebugMode = function() {

      if (debugMode) {
        //ch.visible = true;
        gh.visible = true;
      } else {
        //ch.visible = false;
        gh.visible = false;
      }
    }

    var renderStart = function() {

      gh = new THREE.GridHelper(1000, 100);
      scene.add(gh);

      updateDebugMode();

      // kerydown setup
      setupKeydown();

      // event
      $(window).bind('mousemove', mousemove);

      // render
      cameraMode = defaultCamera;
      render();
      cameraAutoUpdate();

      setTimeout( function(){
        $('> canvas', $container).css({visibility: 'visible'});
        $container.css({visibility: 'visible', display: 'none'});
        $container.fadeIn(parseInt(options.fadeIn));
      }, parseInt(options.delay) );
    }

    var mousemove = function(e) {
      mousePos.x = e.clientX / ww * 2 - 1;
      mousePos.y = e.clientY / wh * 2 - 1;
    }

    var cameraAutoUpdate = function() {
      var pam = Math.round(Math.random() * 1) - 1;
      if (!pam) pam += 1;

      camera.dx = Math.random() * pam * 0.3;
      camera.dy = Math.random() * pam * 0.3;
      camera.dz = Math.random() * pam * 0.3;
      cameraPos.x = Math.random() * range - range / 2;
      cameraPos.y = Math.random() * range - range / 2;
      cameraPos.z = Math.random() * range - range / 2;

      cUpdateID = setTimeout(function() {
        cameraAutoUpdate();
      }, 7000);
    }

    var render = function() {

      var g = pGeometry;
      var vLength = g.vertices.length;

      for( i = 0; i < vLength; i++ ){
        var v = g.vertices[i];
        var b = g.before[i];

        var pos1 = b.t1 + Math.random() * 0.001 - 0.0005;
        var pos2 = b.t2 + Math.random() * 0.001 - 0.0005;

        if( pos1 > 1 ) pos1 = 0;
        if( pos2 > 1 ) pos2 = 0;

        var theta1 = 360 * pos1 * Math.PI / 180;
        var theta2 = ( 180 * pos2 - 90 ) * Math.PI / 180;
        var radius = 380;

        v.x = radius * Math.cos(theta2) * Math.sin(theta1);
        v.y = radius * Math.sin(theta2);
        v.z = radius * Math.cos(theta2) * Math.cos(theta1);

        b.t1 = pos1;
        b.t2 = pos2;
      }

      g.verticesNeedUpdate = true;

      if (cameraMode == 'auto') {
        cameraPos.x += camera.dx;
        cameraPos.y += camera.dy;
        cameraPos.z += camera.dz;
        camera.position.x = cameraPos.x;
        camera.position.y = cameraPos.y;
        camera.position.z = cameraPos.z;
      } else if (cameraMode == 'manual') {
        // manual camera
        rotX = mousePos.x * 180;
        rotY = mousePos.y * 90;
        dRotX += (rotX - dRotX) * 0.05;
        dRotY += (rotY - dRotY) * 0.05;

        // camera update
        camera.position.x = dDistance * Math.sin(dRotX * Math.PI / 180);
        camera.position.y = dDistance * Math.sin(dRotY * Math.PI / 180);
        camera.position.z = dDistance * Math.cos(dRotX * Math.PI / 180);
      }

      camera.lookAt(scene.position);


      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    ///////////////////////////////////////
    // getter
    Background.prototype.get = function() {
      return _;
    };

    ///////////////////////////////////////
    // setter
    Background.prototype.setTotalFFT = function(val) {
      total = val;
    };

    Background.prototype.setFFT = function(val) {
      values = val;
    };

    constructor();
  };

  var debug = function($obj) {
    if (window.console && window.console.log) {
    }
  }

  var getBrowser = function(){
      var ua = window.navigator.userAgent.toLowerCase();
      var ver = window.navigator.appVersion.toLowerCase();
      var name = 'unknown';

      if (ua.indexOf("msie") != -1) {
        if (ver.indexOf("msie 6.") != -1) {
            name = 'ie6';
        }
        else if (ver.indexOf("msie 7.") != -1) {
          name = 'ie7';
        }
        else if (ver.indexOf("msie 8.") != -1) {
          name = 'ie8';
        }
        else if (ver.indexOf("msie 9.") != -1) {
          name = 'ie9';
        }
        else if (ver.indexOf("msie 10.") != -1) {
          name = 'ie10';
        }
        else {
            name = 'ie';
        }
      }
      else if (ua.indexOf('trident/7') != -1) {
        name = 'ie11';
      }
      else if (ua.indexOf('chrome') != -1) {
        name = 'chrome';
      }
      else if (ua.indexOf('safari') != -1) {
        name = 'safari';
      }
      else if (ua.indexOf('opera') != -1) {
        name = 'opera';
      }
      else if (ua.indexOf('firefox') != -1) {
        name = 'firefox';
      }
    return name;
  };

  var isSmartDevice = function(){
    var ua = navigator.userAgent;
    var flag = false;

    if ( (ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ) {
      flag = 'smartphone';
    }
    else if( ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 ) {
      flag = 'tablet';
    }
    return flag;
  }

  /* Create plugin pi Circle canvas */
  $.fn.piCircleCanvas = function () {
    return Background($(this));
  }
})(jQuery)
