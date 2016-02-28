$(document).ready(function(){
    $.get('../../templates/current-calls.handlebars.html', function (data) {
        var template=Handlebars.compile(data);
        //console.log(template({}));
        $.get('callsData', function(data){
            console.log(data);
        });
    }, 'html')
});
