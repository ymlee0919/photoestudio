(function ($) {
    "use strict";

    $('.modal-trigger').click((e) => {
        let contentEl = $(e.currentTarget.attributes['data-content'].value);
        $('#modal-body').html(contentEl.html());
    });

    $('#modal-reserve-btn').click(function() {
        let id = $('#modal-body > div > h4[role="label"]').attr('data-offer');
        $('#client-offer-select').val(id);
        $('#offer-modal').modal('hide');
        $('#reserve-modal').modal('show');
    });

    document.addEventListener( 'DOMContentLoaded', function() {
        var splide = new Splide(".splide", {
			type: "loop",
			focus: "center",
            speed: 700,
			fixedHeight: "400px",
			autoWidth: true,
            autoplay: true,
            autoScroll: {
                speed: 1,
              },
		});
        splide.mount();
      } );

    
})(jQuery);

