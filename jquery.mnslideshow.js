(function($) {
    $.fn.mnslideshow = function(options) {

        var defaults = {
            transition: 'fade',
            transitionIn: '',
            transitionOut: '',
            options: {},
            optionsIn: {},
            optionsOut: {},
            continuous: true,
            speed: 1000,
            pause: 2000
        };
        var options = $.extend(defaults, options);
        if (options.transitionIn == '') {
            options.transitionIn = options.transition;
        }
        if (options.transitionOut == '') {
            options.transitionOut = options.transition;
        }
        var thisSlide = 0;
        var nextSlide = 1;
        var slides = $(this).find('li');
        $(slides).each(function() {
            $(this).css('display', 'none');
        });
        $(slides[0]).css('display', 'block');
        function animate() {
            if( options.transitionOut == 'fade') {
                $(slides[thisSlide]).fadeOut(
                    options.speed
                );
            } else {
                $(slides[thisSlide]).hide(
                    options.transitionOut,
                    options.optionsOut,
                    options.speed
                );
            }
            if (options.transitionIn == 'fade') {
                $(slides[nextSlide]).fadeIn(
                    options.speed,
                    function() {
                        thisSlide = nextSlide;
                        nextSlide++;
                        if(slides.length <= nextSlide && !options.continuous) {
                            return;
                        } else if (slides.length <= nextSlide) {
                            nextSlide = 0;
                        }
                        timeout = setTimeout(function() {
                            animate();
                        }, options.pause);
                    }
                );
            } else {
                $(slides[nextSlide]).show(
                    options.transitionIn,
                    $.extend(
                        options.optionsIn,
                        {
                            queue: false
                        }
                    ),
                    options.speed,
                    function() {
                        thisSlide = nextSlide;
                        nextSlide++;
                        if (slides.length <= nextSlide) {
                            nextSlide = 0;
                        }
                        timeout = setTimeout(function() {
                            animate();
                        }, options.pause);
                    }
                );
            }
        }
        timeout = setTimeout(function(){
            animate();
        },options.pause);
    };
})(jQuery);