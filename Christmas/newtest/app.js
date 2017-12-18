angular.module('christmasLists', [])
	.controller('listController', function( $scope ) {
        $scope.activeMember;
        $scope.activeMemberData;
        $scope.members = [
            {
                "name": "rebekah",
                "file": "rebekah.json"
            },
            {
                "name": "sarah",
                "file": "sarah.json"
            }
        ];
        $scope.selectMember = function( member ){
            $scope.activeMember = member;
        };
        $scope.loadMemberData = function( member )
        {
            $scope.selectMember( member );
            $scope.requestResource( $scope.activeMember.file, function( results )
                {
                $scope.activeMemberData = results;
                console.log( $scope.activeMemberData );
								$scope.$apply();
                }
            );
        };
    /* we have a scope variable called request resource
        that we assign a function to                    */
        $scope.requestResource = function( filename, onComplete ){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   // Typical action to be performed when the document is ready:
                   onComplete( this.responseText );
                }
            };
            xhttp.open("GET", filename, true);
						xhttp.withCredentials = false;
            xhttp.send();
        };
    });
