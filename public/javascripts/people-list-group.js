$(document).ready(function(){
    $('.selectpicker').selectpicker({
        size: 10
    });

    var selected = [];
    var table = $('.data-table').DataTable({
        columnDefs: [ { orderable: false, targets: [1, 7] }, { visible: false, targets: [0] }],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/data/usersList',
            type: 'POST'
        },
        language: {
            url: '../resources/Bulgarian.json'
        },
        lengthMenu: [[10, 15, 25, 50, 100, 500], [10, 15, 25, 50, 100, 500]],
        pageLength: 15,
        "rowCallback": function( row, data ) {
            if ( $.inArray(data[0], selected) !== -1 ) {
                $(row).addClass('selected');
            }
        },
        "drawCallback": function() {
            $("tbody tr").click(function () {
                var position = table.row(this).data(); // getting the clicked row position
                var id = position[0];
                var index = $.inArray(id, selected);

                if ( index === -1 ) {
                    selected.push( id );
                } else {
                    selected.splice( index, 1 );
                }
                $(this).toggleClass('selected');
            } );
        },
        "createdRow": function( row, data, dataIndex ) {
            $($(row).children()[6]).tooltip({title: data[7], placement: "top", viewport: {selector: "table", padding: 0}});
        }
    });
    $('#add-button').on('click', function(){
        var object={};
        var group = $( "#group-select" ).val();

        console.log(selected);
        object.ids = selected;
        object.group = group;
        console.log(object);

        if(!object.ids[0]){
            toastr["error"]("Моля изберете контакти за добавяне!");
        } else{
            $.ajax({
                url : "/people/addToGroup",
                type: "POST",
                contentType: 'application/json',
                data : JSON.stringify(object),
                success: function(data, textStatus, jqXHR)
                {
                    table.ajax.reload(null, false);
                    toastr["success"]("Успешно добавяне в група!");
                    selected = [];
                },
                error: function (jqXHR, textStatus, errorThrown)
                {

                }
            });
        }
    });
    $('td').each(function(index){
        console.log("asds");
        $this = $(this);
        var titleVal = $this.text();
        $this.attr('title', titleVal);
    });
});