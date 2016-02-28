$(document).ready(function(){
    $.get('../../templates/current-calls.handlebars.html', function (hbtempl) {
        var template=Handlebars.compile(hbtempl);
        //console.log(template({}));
        $.get('callsData', function(data){
            console.log(template(data));
        });
    }, 'html')
});
