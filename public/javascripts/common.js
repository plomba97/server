$(document).ready(function(){
    $('tbody').on('click', function(event){

        if($(event.target).hasClass('checkbox-container')){
            var $checkBox = $(event.target).find('input:checkbox');
            $checkBox.prop("checked", !$checkBox.prop("checked"));
        }
        var id;
        if($(event.target).hasClass('person-info')){
            id = $(event.target).parent().attr('id');
            $('#infoModal').modal('show');
            $.get('/data/personInfo/' + id, function(data){
                $('#infoModal').find('.modal-body').html(data);
            });
        }
        else if($(event.target).hasClass('group-info')){
            id = $(event.target).parent().attr('id');
            $('#infoModal').modal('show');
            console.log(id);
            $.get('/data/groupInfo/' + id, function(data){
                $('#infoModal').find('.modal-body').html(data);
            });
        }
    });

    $('.data-table').DataTable({
        rowReorder: true
    });
});
