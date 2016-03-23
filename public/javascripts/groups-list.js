$(document).ready(function(){
    var table = $('.data-table').DataTable({
        columnDefs: [ { orderable: false, targets: [1] }, { visible: false, targets: [0] }],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/data/groupsList',
            type: 'POST'
        },
        language: {
            url: '../resources/Bulgarian.json'
        },
        lengthMenu: [[10, 15, 25, 50, 100, 500], [10, 15, 25, 50, 100, 500]],
        pageLength: 15,
        "drawCallback": function() {
            $("tbody tr").click(function() {
                var position = table.row(this).data();
                var id = position[0];
                $('#infoModal').modal('show');
                $.get('/data/groupInfo/' + id, function(data){
                    $('#infoModal').find('.modal-body').html(data);
                });
            });
        },
        scrollX: '100vh',
        scrollY: '61vh',
        scrollCollapse: true
    });

    $(".save-button ").on('click', function(event){
        var id = $('#group-id-box').val();
        var updateData = {};
        updateData.updatedGroup = {};
        updateData.updatedGroup.name = $('#name').val();
        updateData.updatedGroup.comment = $('#comment').val();

        $.ajax({
            url : "/data/updateGroup/"+id,
            type: "POST",
            contentType: 'application/json',
            data : JSON.stringify(updateData),
            success: function(data, textStatus, jqXHR)
            {
                table.ajax.reload(null, false);
                $('#infoModal').modal('hide');
                toastr["success"]("Успешно обновихте записа!")
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr["error"]("Грешка при обновяването на записа!")
            }
        });
    });

    $(".delete-button ").on('click', function(event){
        var id = $('#group-id-box').val();
        $.ajax({
            url : "/data/deleteGroup/" + id,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                table.ajax.reload(null, false);
                $('#infoModal').modal('hide');
                toastr["success"]("Успешно изтрихте записа!")
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr["error"]("Грешка при изтриването на записа!")
            }
        });
    });
});
