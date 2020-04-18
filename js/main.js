var main = {
  init : function() {
    // COLLAPSIBLE BOX
    let myLabels = document.querySelectorAll('.lbl-toggle');

    Array.from(myLabels).forEach(label => {
      label.addEventListener('keydown', e => {
        if (e.which === 32 || e.which === 13) {
          e.preventDefault();
          label.click();
        };
      });
    });

    $(function() {
      var url = window.location.href;
        $(".navbar-nav a").each(function() {
          if (url == (this.href)) {
            $(this).closest("li").addClass("active");
          }
        });
    });

    $(window).scroll(function() {
      if ($(document).scrollTop() > 20) {
        $(".navbar").addClass("short-navbar");
      } else {
        $(".navbar").removeClass("short-navbar");
      }
    });

    $(document).ready(function () {
      $('.hamburger-button').on('click', function () {
        $('.animated-icon').toggleClass('open');
      });
    });

    // Reading Position Idicatior
    $(document).ready(function(){
      var getMax = function(){
      return $(document).height() - $(window).height();
      }
  
      var getValue = function(){
        return $(window).scrollTop();
      }
  
      if('max' in document.createElement('progress')){
        // Browser supports progress element
        var progressBar = $('progress');
        // Set the Max attr for the first time
        progressBar.attr({ max: getMax() });

        $(document).on('scroll', function(){
          // On scroll only Value attr needs to be calculated
          progressBar.attr({ value: getValue() });
        });
    
        $(window).resize(function(){
          // On resize, both Max/Value attr needs to be calculated
          progressBar.attr({ max: getMax(), value: getValue() });
        });   
      }
      else {
        var progressBar = $('.progress-bar'), 
            max = getMax(), 
            value, width;
      
        var getWidth = function(){
          // Calculate width in percentage
          value = getValue();            
          width = (value/max) * 100;
          width = width + '%';
          return width;
        }
      
        var setWidth = function(){
          progressBar.css({ width: getWidth() });
        }
      
        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
          // Need to reset the Max attr
          max = getMax();
          setWidth();
        });
      }
    });

    $(document).ready(function(){
      $('#progressBar').addClass('single');
    });


    // Typewriter

    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } 
      else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      }
      else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      },
      delta);
    };

    window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid green}";
      document.body.appendChild(css);
    };

    
  },
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', main.init);
