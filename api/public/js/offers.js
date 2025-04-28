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
})(jQuery);

