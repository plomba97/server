$(document).ready(function(){
    $.get('../../templates/current-calls.handlebars.html', function (hbtempl) {
        var template=Handlebars.compile(hbtempl);
        //console.log(template({}));
        var intervalId = setInterval(function(){
            $.get('/data/calls', function(data){
                $('.template-target').html(template(data));
            });
        }, 500);
    }, 'html')
});
