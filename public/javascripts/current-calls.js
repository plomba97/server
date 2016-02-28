$(document).ready(function(){
    $.get('../../templates/current-calls.handlebars.html', function (hbtempl) {
        var template=Handlebars.compile(hbtempl);
        //console.log(template({}));
        var intervalId = setInterval(function(){
            $.get('/data/calls', function(data){
                if(!data.calls[0]){
                    clearInterval(intervalId);
                }
                else{
                    $('.template-target').html(template(data));
                }
            });
        }, 500);
    }, 'html')
});
