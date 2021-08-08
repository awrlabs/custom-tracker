/* global trackerCapture, angular */

var trackerCapture = angular.module('trackerCapture');
trackerCapture.controller('VaccinationConstController',
    function (
        $scope,
        CurrentSelection,
        SessionStorageService,
        OptionSetService
    ) {
        
        var selections = CurrentSelection.get().optionSets;

        $scope.vaccineOptions = {
            product: null,
            batch: null,
        };

        $scope.vaccineProductOptions = selections['m8kSC9Sl2mE'].options;
        $scope.vaccineBatchOptions = selections['Sx0iIwAsj5S'].options;

        console.log('test');
        console.log(selections);

        $scope.saveOptions = () => {
            SessionStorageService.set('VACCINE_PRODUCT', $scope.vaccineOptions.product);
            SessionStorageService.set('VACCINE_BATCH', $scope.vaccineOptions.batch);
        }
            
    });