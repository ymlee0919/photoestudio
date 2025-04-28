(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$(".sticky-top").addClass("shadow-sm bg-white");
		} else {
			$(".sticky-top").removeClass("shadow-sm bg-white");
		}
	});
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 300, 'easeInOutExpo');
        return false;
    });

    // Reserve modal
    let reserveHandler = {
        phoneNumber: $('#reserve-phone').val(),
        nameEl: $('#client-name-input'),
        serviceEl: $('#client-service-select'),
        offerEl: $('#client-offer-select'),
        requestBtn: $('#request-btn'),

        init: function() {
            let me = this;

            this.nameEl.on('input', me.buildMessage.bind(me));
            this.serviceEl.change(me.buildMessage.bind(me));
            this.offerEl.change(me.buildMessage.bind(me));
        },

        buildMessage : function() {
            let name = this.nameEl.val().trim(), service = this.serviceEl.val(), offer = this.offerEl.val();
            
            if(name.length == 0 || !service || !offer) {
                this.requestBtn.addClass('disabled');
                return;
            }

            this.requestBtn.removeClass('disabled');
            
            let message = "Hola, me llamo " + name + '. ';
            message += "Quiero reservar su servicio de fotos de/para *" + service + "*. ";
            
            if(offer == "IKD")
                message += "Aún no me decido por la oferta. "
            else {
                let tokens = offer.split("::");
                message += "Me interesa la offerta *" + tokens[0] + "* de " + tokens[1] + ". "
            }

            let phone = this.phoneNumber.replace('+', '');

            message += "¿Podrías darme más detalles y disponibilidad?"
            message = encodeURIComponent(message);

            let whatsappUrl = "https://wa.me/" + phone + "?text=" + message;
            this.requestBtn.attr('href', whatsappUrl);
        }
    }
    
    reserveHandler.init();

})(jQuery);

