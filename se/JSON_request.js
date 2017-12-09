var json_request = //"http://evanescence.herokuapp.com/get_classes?num=6&department=CMP_SC"
"http://evanescence.herokuapp.com/get_classes?num=6&department=CMP_SC";
    
    
/*

These are the supported arguments for the request

degrees = ["CSMajor","ITMajor", "MathMinor", "MusicStudiesMajor", "BusinessMinor"]

Business and Music won't work until Luke and Evan set them up.
Using them will likely result in an error.



This is how a request should look

http://evanescence.herokuapp.com/get_degree?deg1=CSMajor&deg2=MathMinor

*/


// Maybe give this method a try later...
/*
$.getJSON( json_request, function( data ) {
    var items = [];
    console.log("Doing the thing...");
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
    })
    .fail(function() {
        console.log( "error" );
    })
    .always(function() {
        console.log( "complete" );
    });

// I'll worry about this stuff later...