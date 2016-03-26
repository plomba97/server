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
            $("tbody tr").contextMenu({
                menuSelector: "#contextMenu",
                menuSelected: function (invokedOn, selectedMenu) {
                    var position = table.row(invokedOn).data();
                    var id = position[0];
                    if(selectedMenu.hasClass('menu-details')){
                        $('#groupEditModal').modal('show');
                        $.get('/data/groupInfo/' + id, function(data){
                            $('#groupEditModal').find('.modal-body').html(data);
                        });
                    }
                    else if(selectedMenu.hasClass('menu-edit')){
                        $('#groupEditModal').modal('show');
                        $.get('/data/groupInfo/' + id, function(data){
                            $('#groupEditModal').find('.modal-body').html(data);
                        });
                    }
                    else if(selectedMenu.hasClass('menu-delete')){
                        var name = position[2];
                        var deleteModal = $('#confirmDeleteModal');
                        deleteModal.modal('show');
                        deleteModal.find('#id-box').val(id);
                        deleteModal.find('#warning-text-paragraph').text('Наистина ли искате да изтриете: ');
                        deleteModal.find('#name').text(name);
                        console.log('delete');
                    }
                }
            });
        }
    });

    $(".save-button ").on('click', function(event){
        var id = $('#id-box').val();
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
                $('#groupEditModal').modal('hide');
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
        console.log("the id" + id);
        $.ajax({
            url : "/data/deleteGroup/" + id,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                table.ajax.reload(null, false);
                $('#confirmDeleteModal').modal('hide');
                toastr["success"]("Успешно изтрихте записа!")
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr["error"]("Грешка при изтриването на записа!")
            }
        });
    });
});
