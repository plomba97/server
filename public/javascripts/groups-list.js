$(document).ready(function(){
    var table = $('.data-table').DataTable({
        columnDefs: [ { orderable: false, targets: [] }, { visible: false, targets: [0] }],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/data/groupsList',
            type: 'POST'
        },
        lengthMenu: [[10, 15, 25, 50], [10, 15, 25, 50]],
        pageLength: 15,
        "fnDrawCallback": function() {
            $("tbody tr").click(function() {
                var position = table.row(this).data();
                var id = position[0];
                $('#infoModal').modal('show');
                $.get('/data/groupInfo/' + id, function(data){
                    $('#infoModal').find('.modal-body').html(data);
                });
            });
        }
    });

    $(".save-button ").on('click', function(event){
        var updateData = {};
        updateData.updatedGroup = {};
        updateData.id = $('#group-id-box').val();
        updateData.updatedGroup.name = $('#name').val();
        updateData.updatedGroup.comment = $('#comment').val();

        $.ajax({
            url : "/data/updateGroup",
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
