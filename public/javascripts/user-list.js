$(document).ready(function(){
    $('tr').on('click', function(event){
        if(event.target.className == 'person-details'){
            var id = $(this).find('input:checkbox').attr('id');

        }
    });
});
