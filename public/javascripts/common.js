$(document).ready(function(){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $.fn.contextMenu = function (settings) {
        return this.each(function () {
            // Open context menu
            $(this).on("contextmenu", function (outterEvent) {
                // return native menu if pressing control
                if (outterEvent.ctrlKey) return;

                //open menu
                var $menu = $(settings.menuSelector)
                    .data("invokedOn", $(outterEvent))
                    .hide()
                    .slideDown(100)
                    .css({
                        position: "absolute",
                        left: getMenuPosition(outterEvent.clientX, 'width', 'scrollLeft'),
                        top: getMenuPosition(outterEvent.clientY, 'height', 'scrollTop')
                    })
                    .off('click')
                    .on('click', 'a', function (e) {
                        $menu.slideUp(100);
                        var $invokedOn = $(outterEvent.target).parent();
                        var $selectedMenu = $(e.target);

                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                    });
                return false;
            });
            //make sure menu closes on any click
            $('body').on('click contextmenu mouseleave', function () {
                $(settings.menuSelector).slideUp(100);
            });
        });

        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                scroll = $(window)[scrollDir](),
                menu = $(settings.menuSelector)[direction](),
                position = mouse + scroll;

            // opening menu would pass the side of the page
            if (mouse + menu > win && menu < mouse)
                position -= menu;

            return position;
        }

    };

    var dropdown = $('.dropdown');
    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    dropdown.on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(100);
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    dropdown.on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);
    });

    $('body').on('contextmenu mouseleave', function () {
        $('.dropdown.open .dropdown-toggle').dropdown('toggle');
    });
});