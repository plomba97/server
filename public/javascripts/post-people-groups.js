$(document).ready(function(){
    $('#add-button').on('click', function(){
        var ids=[];
        var object={};
        var group = $( "#group-select" ).val();
        $('input:checkbox:checked').each(function () {
            ids.push($(this).attr('id'));
        });
        console.log(ids);
        object.ids = ids;
        object.group = group;
        console.log(object);

        $.ajax({
            url : "/people",
            type: "POST",
            contentType: 'application/json',
            data : JSON.stringify(object),
            success: function(data, textStatus, jqXHR)
            {
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {

            }
        });
    });
});