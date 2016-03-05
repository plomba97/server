$(document).ready(function(){
    $('tr').on('click', function(event){
        if(event.target.className == 'person-details'){
            var id = $(this).find('input:checkbox').attr('id');
            $('#infoModal').modal('show');
            $.get('/data/personInfo/' + id, function(data){
                $('#infoModal').find('.modal-body').html(data);
            });
        }
    });

});
