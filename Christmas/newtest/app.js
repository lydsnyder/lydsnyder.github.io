angular.module('christmasLists', [])
	.controller('listController', function( $scope ) {
        $scope.members = [ 
            {
                "name": "rebekah",
                "file": "rebekah.json"
            },
            {
                "name": "sarah",
                "file": "sarah.json"
            }
        ]
    /* we have a scope variable called request resource
        that we assign a function to                    */
        $scope.requestResource = function( filename ){ 
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   // Typical action to be performed when the document is ready:
                   document.getElementById("demo").innerHTML = xhttp.responseText;
                }
            };
            xhttp.open("GET", filename, true);
            xhttp.send();
        };
    });