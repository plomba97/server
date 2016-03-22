$(document).ready(function(){
    var table = $('.data-table').DataTable({
        columnDefs: [ { orderable: false, targets: [6] }, { visible: false, targets: [0] }],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/data/usersList',
            type: 'POST'
        },
        "fnDrawCallback": function() {
            $("tbody tr").click(function() {
                var position = table.row(this).data(); // getting the clicked row position
                var id = position[0];
                $('#infoModal').modal('show');
                $.get('/data/personInfo/' + id, function(data){
                    $('#infoModal').find('.modal-body').html(data);
                });
            });
        },
        "createdRow": function( row, data, dataIndex ) {
            $($(row).children()[5]).attr('title', data[6]);
        }
    });

    $(".save-button ").on('click', function(event){
        var updateData = {};
        updateData.updatedPerson = {};
        updateData.id = $('#person-id-box').val();
        updateData.updatedPerson.title = $('#title').val();
        updateData.updatedPerson.firstName = $('#firstName').val();
        updateData.updatedPerson.secondName = $('#secondName').val();
        updateData.updatedPerson.lastName = $('#lastName').val();
        updateData.updatedPerson.jobTitle = $('#jobTitle').val();
        updateData.updatedPerson.email = $('#email').val();
        $.ajax({
            url : "/data/updateUser",
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
        var id = $('#person-id-box').val();
        $.ajax({
            url : "/data/deleteUser/" + id,
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