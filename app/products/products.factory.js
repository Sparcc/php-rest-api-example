app.factory("productsFactory", function($http){
 
    var factory = {};
    var baseUrl = 'https://sparcccode.000webhostapp.com/';
    
    factory.readPages  = function(){
        return $http({
            method: 'GET',
            url: 'api/product/read_paging.php'
        });
    };
    
    // read all products
    factory.readProducts = function(){
        return $http({
            method: 'GET',
            url: 'api/product/read.php'
        });
    };
    
    // read all products on a page
    factory.readProductsPage = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'api/product/read_paging.php?page='+pageNumber
        });
    };
     
    // create product
    factory.createProduct = function($scope){
        return $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price,
                'category_id' : 1
            },
            url: baseUrl+'api/product/create.php'
        });
    };
 
    // read one product
    factory.readOneProduct = function(id){
        return $http({
            method: 'GET',
            url: baseUrl+'api/product/read_one.php?id=' + id
        });
    };
 
    // update product
    factory.updateProduct = function($scope){
    
        return $http({
            method: 'POST',
            data: {
                'id' : $scope.id,
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price,
                'category_id' : 1
            },
            url: baseUrl+'api/product/update.php'
        });
    };
    
    // delete product
    factory.deleteProduct = function(id){
        return $http({
            method: 'POST',
            data: { 'id' : id },
            url: baseUrl+'api/product/delete.php'
        });
    };
 
    // search all products
    factory.searchProducts = function(keywords){
        return $http({
            method: 'GET',
            url: baseUrl+'api/product/search.php?s=' + keywords
        });
    };
     
    return factory;
    
    
});