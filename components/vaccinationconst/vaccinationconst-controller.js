/* global trackerCapture, angular */

var trackerCapture = angular.module('trackerCapture');
trackerCapture.controller('VaccinationConstController',
    function (
        $scope,
        SessionStorageService
    ) {

        $scope.vaccineOptions = {
            product: null,
            batch: null,
        };

        var vaccineProductOptions = [];
        var vaccineBatchOptions = [];

        $scope.saveOptions = () => {
            SessionStorageService.set('VACCINE_PRODUCT', $scope.vaccineOptions.product);
            SessionStorageService.set('VACCINE_BATCH', $scope.vaccineOptions.batch);
        }
            
    });