$(document).ready(function(){
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
        "drawCallback": function() {
            $("tbody tr").contextMenu({
                menuSelector: "#contextMenu",
                menuSelected: function (invokedOn, selectedMenu) {
                    var position = table.row(invokedOn).data();
                    var id = position[0];
                    if(selectedMenu.hasClass('menu-details')){
                        $('#editModal').modal('show');
                        $.get('/data/personInfo/' + id, function(data){
                            $('#editModal').find('.modal-body').html(data);
                        });
                    }
                    else if(selectedMenu.hasClass('menu-edit')){
                        $('#editModal').modal('show');
                        $.get('/data/personInfo/' + id, function(data){
                            $('#editModal').find('.modal-body').html(data);
                        });
                    }
                    else if(selectedMenu.hasClass('menu-delete')){
                        var name = position[2] + " " + position[3] + " "  +position[4] + " " + position[5];
                        var deleteModal = $('#confirmDeleteModal');
                        deleteModal.modal('show');
                        deleteModal.find('#id-box').val(id);
                        deleteModal.find('#warning-text-paragraph').text('Наистина ли искате да изтриете: ');
                        deleteModal.find('#name').text(name);
                    }
                }
            });
        },
        "createdRow": function( row, data, dataIndex ) {
            $($(row).children()[6]).tooltip({title: data[7], placement: "top", viewport: {selector: "table", padding: 0}});
        }
    });

    $(".save-button ").on('click', function(event){
        var updateData = {};
        var id = $('#id-box').val();
        updateData.updatedPerson = {};
        updateData.updatedPerson.title = $('#title').val();
        updateData.updatedPerson.firstName = $('#firstName').val();
        updateData.updatedPerson.secondName = $('#secondName').val();
        updateData.updatedPerson.lastName = $('#lastName').val();
        updateData.updatedPerson.jobTitle = $('#jobTitle').val();
        updateData.updatedPerson.email = $('#email').val();
        $.ajax({
            url : "/data/updateUser/"+id,
            type: "POST",
            contentType: 'application/json',
            data : JSON.stringify(updateData),
            success: function(data, textStatus, jqXHR)
            {
                table.ajax.reload(null, false);
                $('#editModal').modal('hide');
                toastr["success"]("Успешно обновихте записа!")
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr["error"]("Грешка при обновяването на записа!")
            }
        });
    });

    $(".delete-button ").on('click', function(event){
        var id = $('#id-box').val();
        $.ajax({
            url : "/data/deleteUser/" + id,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                $('#confirmDeleteModal').modal('hide');
                table.ajax.reload(null, false);
                toastr["success"]("Успешно изтрихте записа!");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr["error"]("Грешка при изтриването на записа!")
            }
        });
    });
});