/* global trackerCapture, angular */

import qrcode from 'qrcode-generator';
import ngQrcode from 'angular-qrcode';

var trackerCapture = angular.module('trackerCapture');
trackerCapture.controller('VaccinationController',
    function ($scope,
        $translate,
        DateUtils,
        VaccineCertService,
        EnrollmentService,
        CurrentSelection,
        NotificationService,
        SessionStorageService,
        orderByFilter,
        UsersService) {
        var userProfile = SessionStorageService.get('USER_PROFILE');
        var storedBy = userProfile && userProfile.userCredentials && userProfile.userCredentials.username ? userProfile.userCredentials.username : '';

        var today = DateUtils.getToday();

        $scope.certificate = {
            vaccinationNumber: {
                id: "pXK6VZwj00d",
                required: true
            },
            name: {
                id: "wi1E4HGW2zn",
                required: true
            },
            gender: {
                id: "I2kOTyjBaL7"
            },
            age: {
                id: "QkgK6iUTKV3"
            },
            address: {
                id: "phQypUuyU6Q"
            },
            nic: {
                id: "tJz1lz2sGrl",
                required: true
            },
            teiId: undefined,
            url1: undefined,
            url2: undefined,
            eligibility: true
        };

        $scope.issueInProgress = false;

        $scope.attrMap = {};

        Object.values($scope.certificate).forEach(att => {
            if (att && att.id) {
                $scope.attrMap[att.id] = att;
            }
        });

        $scope.$on('dashboardWidgets', function () {
            $scope.selectedEnrollment = null;
            var selections = CurrentSelection.get();
            $scope.selectedTei = selections.tei;

            console.log("Selection", selections);

            if (selections && selections.tei) {
                $scope.certificate.teiId = selections.tei.trackedEntityInstance;
                selections.tei.attributes.forEach((att) => {
                    if ($scope.attrMap[att.attribute]) {
                        $scope.attrMap[att.attribute].value = att.value;
                    }
                });
            }

            // query for existing cert
            VaccineCertService.certReady($scope.certificate.teiId).then((certUrl1, certUrl2) => {
                $scope.certificate.url1 = certUrl1;
                $scope.certificate.url2 = certUrl2;
            }).catch(err => {
                console.warn("No certificate available in server side");
            });

            // determine eligibility
            Object.values($scope.certificate).forEach(att => {
                if (att && att.required && !att.value) {
                    console.warn("Required field", att.id, "is not specified");
                    $scope.eligibility = false;
                }
            });

            if(!$scope.certificate.teiId){
                $scope.eligibility = false;
            }
        });

        $scope.sendSMS = function () {

        }

        $scope.issue = function () {
            console.log("Issuing certificate...");
            $scope.issueInProgress = true;
            VaccineCertService.persist($scope.certificate.teiId, "", "").then((certUrl1, certUrl2) => {
                $scope.certificate.url1 = certUrl1;
                $scope.certificate.url2 = certUrl2;
            }).catch(err => {
                console.warn("Error occurred when issuing the certificate", err);
            }).finally(() => {
                $scope.issueInProgress = false;
            });
        }
    });
