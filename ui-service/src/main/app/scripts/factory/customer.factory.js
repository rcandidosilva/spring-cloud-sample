define(['app'], function (app) {

    'use strict';

    app.factory('Customer', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         * @constructor
         */
        function Customer(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Customer.prototype = {

            /**
             *
             * @param data
             */
            setData: function (data) {
                angular.extend(this, data);
            },
            list: function (page, size, callback) {
                var self = this;
                $http.get( $rootScope.getHost() + "/core/customers" + "?page=" +  page + "&size=" +   size)
                    .success( function (data, status, headers, config ) {

                        self.setData( data );

                        $rootScope.$broadcast("CUSTOMER_LISTED");

                        if(callback)
                            callback( data, status, headers, config)
                    })
                    .error( function (data, status, headers, config ){
                        $log.error( data );

                        if(callback)
                            callback( data, status, headers, config)
                    });
            },
            load: function (id) {
                var self = this;
                $http.get( $rootScope.getHost() + "/core/customers/" + id)
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("CUSTOMER_LOADED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            update: function (model, callback) {
                $http.put( $rootScope.getHost() + "/core/customers/" + model.id, model)
                    .success(function (data, status, headers, config) {

                        if(callback)
                            callback(data, status, headers, config);

                        $rootScope.$broadcast("CUSTOMER_UPDATED");
                    })
                    .error(function(data, status, headers, config){

                        if(callback)
                            callback(data, status, headers, config);

                        $rootScope.$broadcast("CUSTOMER_UPDATED_ERROR");
                    }
                );
            },
            save: function (model, callback) {
                $http.post( $rootScope.getHost() + "/core/customers/", model)
                    .success(function (data, status, headers, config) {

                        if(callback)
                            callback(data, status, headers, config);

                        $rootScope.$broadcast("CUSTOMER_SAVED");
                    })
                    .error(function(data, status, headers, config){

                        if(callback)
                            callback(data, status, headers, config);

                        $rootScope.$broadcast("CUSTOMER_SAVED_ERROR");
                    }
                );
            },
            delete: function (id, callback) {
                $http.delete( $rootScope.getHost() + "/core/customers/" + id)
                    .success(function (data, status, headers, config) {

                        $rootScope.$broadcast("CUSTOMER_DELETED");

                        if(callback)
                          callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config){

                        $rootScope.$broadcast("CUSTOMER_DELETED_ERROR");

                        if(callback)
                            callback(data, status, headers, config);
                    }
                );
            }

        };

        return Customer;

    }]);
});
