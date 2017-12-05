var json_request = "http://evanescence.herokuapp.com/get_classes?num=6&department=CMP_SC"
    
// Maybe give this method a try later...
/*
$.getJSON( json_request, function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
    });

    $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
    }).appendTo( "body" );
});
*/

// Just some code to try to help figure out how this works
$.getJSON( json_request, function( data ) {
    console.log("success");
    console.log(data);
})
    .done(function() {
        console.log( "second success" );
        console.log(data);
    })
    .fail(function() {
        console.log( "error" );
        console.log(data);
    })
    .always(function() {
        console.log( "complete" );
        console.log(data);
    });

// I'll worry about this stuff later...