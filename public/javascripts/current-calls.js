$(document).ready(function(){
    $.get('../../templates/current-calls.handlebars.html', function (hbtempl) {
        var template=Handlebars.compile(hbtempl);
        //console.log(template({}));
        $.get('/data/calls', function(data){
            $('.template-target').html(template(data));
            console.log(template(data));
        });
    }, 'html')
});
