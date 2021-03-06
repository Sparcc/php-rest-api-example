app.controller('productsController', function($scope, $mdDialog, $mdToast, productsFactory){
    $scope.baseUrl = 'https://sparcccode.000webhostapp.com/';
    $scope.currentPage = 0
    
    // read products
    $scope.readProducts = function(){
        // use products factory
        productsFactory.readProducts().then(function successCallback(response){
            $scope.products = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    }
    
    // read products page
    $scope.readProductsPage = function(){
        $scope.currentPage = pageNumber;
        // use products factory
        //var pageNumber = 1 The function below works fine and was tested
        productsFactory.readProductsPage($scope.currentPage).then(function successCallback(response){
            $scope.products = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    }
    
    //read pages and get page numbers
    $scope.readPages = function(){
        productsFactory.readPages().then(function successCallback(response){
            $scope.pages = response.data.paging.pages;
            console.log("printing out paging.pages");
            //console.log($scope.pages);
        }, function errorCallback(response){
            $scope.showToast("Unable to read pages.");
        });
    }
     
    // show 'create product form' in dialog box
    $scope.showCreateProductForm = function(event){
    
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/products/create_product.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    }
     
    // methods for dialog box
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
    
    // show toast message
    $scope.showToast = function(message){
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }
    
    // clear variable / form values
    $scope.clearProductForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
    }
    
    // create new product
    $scope.createProduct = function(){
        //run factory that sends data to api then...
        productsFactory.createProduct($scope).then(function successCallback(response){
    
            // tell the user new product was created
            $scope.showToast(response.data.message);
    
            // refresh the list
            $scope.readProducts();
    
            // close dialog
            $scope.cancel();
    
            // remove form values
            $scope.clearProductForm();
    
        }, function errorCallback(response){
            $scope.showToast("Unable to create record.");
        });
    }
 
    // retrieve record to fill out the form
    $scope.readOneProduct = function(id){
    
        // get product to be edited
        productsFactory.readOneProduct(id).then(function successCallback(response){
    
            // put the values in form
            $scope.id = response.data.id;
            $scope.name = response.data.name;
            $scope.description = response.data.description;
            $scope.price = response.data.price;
    
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/products/read_one_product.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},
    
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearProductForm();
                }
            );
    
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
    
    }
    
    // retrieve record to fill out the form
    $scope.showUpdateProductForm = function(id){
    
        // get product to be edited
        productsFactory.readOneProduct(id).then(function successCallback(response){
    
            // put the values in form
            $scope.id = response.data.id;
            $scope.name = response.data.name;
            $scope.description = response.data.description;
            $scope.price = response.data.price;
    
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/products/update_product.template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},
    
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearProductForm();
                }
            );
    
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
    
    }
    
    // update product record / save changes
    $scope.updateProduct = function(){
    
        productsFactory.updateProduct($scope).then(function successCallback(response){
    
            // tell the user product record was updated
            $scope.showToast(response.data.message);
    
            // refresh the product list
            $scope.readProducts();
    
            // close dialog
            $scope.cancel();
    
            // clear modal content
            $scope.clearProductForm();
    
        },
        function errorCallback(response) {
            $scope.showToast("Unable to update record.");
        });
    
    }
    
    // cofirm product deletion
    $scope.confirmDeleteProduct = function(event, id){
    
        // set id of record to delete
        $scope.id = id;
    
        // dialog settings
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Product will be deleted.')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
    
        // show dialog
        $mdDialog.show(confirm).then(
            // 'Yes' button
            function() {
                // if user clicked 'Yes', delete product record
                $scope.deleteProduct();
            },
    
            // 'No' button
            function() {
                // hide dialog
            }
        );
    }
    
    // delete product
    $scope.deleteProduct = function(){
    
        productsFactory.deleteProduct($scope.id).then(function successCallback(response){
    
            // tell the user product was deleted
            $scope.showToast(response.data.message);
    
            // refresh the list
            $scope.readProducts();
    
        }, function errorCallback(response){
            $scope.showToast("Unable to delete record.");
        });
    
    }
    
    // search products
    $scope.searchProducts = function(){
    
        // use products factory
        productsFactory.searchProducts($scope.product_search_keywords).then(function successCallback(response){
            $scope.products = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    }
});