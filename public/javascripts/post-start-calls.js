$(document).ready(function(){
    $('#start-button').on('click', function(){
        var ids=[];
        var object={};
        var recording = $( "#recording-select" ).val();
        $('input:checkbox:checked').each(function () {
            ids.push($(this).attr('id'));
        });
        console.log(ids);
        object.ids = ids;
        object.recording = recording;
        console.log(object);

        $.ajax({
            url : "/inform",
            type: "POST",
            contentType: 'application/json',
            data : JSON.stringify(object),
            success: function(data, textStatus, jqXHR)
            {
                //window.location.replace("/inform/calls");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {

            }
        });
    });
});
