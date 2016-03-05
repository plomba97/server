$(document).ready(function(){
    $('td.checkbox-container').on('click', function(event){
        //$(this).toggleClass('active');
        if(!(event.target.type === 'checkbox')){
            var $checkBox = $(this).find('input:checkbox');
            $checkBox.prop("checked", !$checkBox.prop("checked"));
        }
    });
    $('.data-table').DataTable();

});
