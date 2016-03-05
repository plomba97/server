$(document).ready(function(){
    $('.table').on('click', function(event){
        //$(this).toggleClass('active');

        if(!(event.target.type === 'checkbox')){
            var $checkBox = $(event.target).find('input:checkbox');
            $checkBox.prop("checked", !$checkBox.prop("checked"));
        }
        var id;
        if($(event.target).hasClass('person-info')){

            id = $(event.target).siblings('.checkbox-container').find('input:checkbox').attr('id');
            $('#infoModal').modal('show');
            $.get('/data/personInfo/' + id, function(data){
                $('#infoModal').find('.modal-body').html(data);
            });
        }
        else if($(event.target).hasClass('group-info')){
            id = $(event.target).siblings('.checkbox-container').find('input:checkbox').attr('id');
            $('#infoModal').modal('show');
            console.log(id);
            $.get('/data/groupInfo/' + id, function(data){
                $('#infoModal').find('.modal-body').html(data);
            });
        }
    });

    $('.data-table').DataTable();

});
