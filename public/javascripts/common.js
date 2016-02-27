$(document).ready(function(){
    $('tr').on('click', function(event){
        //$(this).toggleClass('active');
        if(!(event.target.type === 'checkbox')){
            var $checkBox = $(this).find('input:checkbox');
            $checkBox.prop("checked", !$checkBox.prop("checked"));
        }
    });

    $(document).ready(function(){
        $('.data-table').DataTable();
    });
});
