$(document).ready(function(){
    var intervalId = setInterval(function(){
        $.get('/data/calls', function(data){
            $('.template-target').html(data);
        });
    }, 2000);
});
