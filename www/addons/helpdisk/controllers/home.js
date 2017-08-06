angular.module('mm.addons.helpdisk')
    .controller('mmaHelpDiskCtrl', function($helpdisk, $cordovaImagePicker, $scope, $ionicLoading, $state) {
        var self = this;
        self.profileLoading = true;
        self.user = {};
        $helpdisk.profile().then(function(res) {
        	self.user.email = res.data.user[0].email;
        	self.user.mobile = res.data.user[0].mobile;
        }).finally(function() {
        	self.profileLoading = false;
        });

        self.add = function() {
        	$ionicLoading.show({
			    content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
			});

            var fileURL = self.imageUrl;
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = true;

            options.params = self.user;

        	var a = $helpdisk.sendData(fileURL, onSuccess, onError, options);
            console.log(a);
            // $helpdisk.send(self.user).then(function(res) {
            //     if (res.data.success) {
            //         self.user = {};
            //         $ionicLoading.hide();
            //     }
            // })
        }

        function onSuccess(res) {
            console.log(res);
        }

        function onError(res) {
            console.log(res);
        }

        self.addImage = function(fromAlbum) {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    self.imageUrl = results[0]
                    window.resolveLocalFileSystemURI(self.imageUrl,
                        function (fileEntry) {
                            // convert to Base64 string


                            fileEntry.file(
                                function(file) {
                                    //got file
                                    var reader = new FileReader();
                                    reader.onloadend = function (evt) {
                                        var imgData = evt.target.result; // this is your Base64 string
                                        self.base64 = imgData;
                                        console.log(imgData);
                                    };
                                    reader.readAsDataURL(file);
                                }, 
                            function (evt) { 
                                //failed to get file
                                console.log(evt)
                            });
                        },
                        // error callback
                        function () { }
                    );
                }, function(error) {
                    console.log(error);    
                });
        }

    });