/* global trackerCapture, angular */


import vfs from "./vfs";
import getPdfDef from "./pdf_def";

pdfMake.vfs = vfs;

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

        $scope.loading = {
            issue: false,
            all: true
        };

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
            phone: {
                id: "eYViMjtiWRA",
            },
            doses: {
                dose1: {
                    id: "fZ3diyIwzDF"
                },
                dose2: {
                    id: "fxIEVGCv63j"
                },
            },
            teiId: undefined,
            url1: undefined,
            url2: undefined,
            eligibility: true
        };

        $scope.qrImage = "";

        $scope.reissueSuggestion = false;
        $scope.reissueSuggestionTimeout = false;

        $scope.attrMap = {};
        $scope.dosesMap = {
            "fZ3diyIwzDF": $scope.certificate.doses.dose1,
            "fxIEVGCv63j": $scope.certificate.doses.dose2,
        };

        // existence check is valid for the same nic
        $scope.existChecked = false;
        $scope.existCheckedForNic = undefined;
        // end of existence checking 

        Object.values($scope.certificate).forEach(att => {
            if (att && att.id) {
                $scope.attrMap[att.id] = att;
            }
        });

        function setUrls(urls) {
            $scope.certificate.url1 = urls.url1;
            $scope.certificate.url2 = urls.url2;
            QRCode.toDataURL(urls.url1)
                .then(data => {
                    $scope.$apply(function () {
                        $scope.qrImage = data;
                    });
                }).catch(err => {
                    console.error("Error in generating QR", err);
                });
        }

        function updateData(suggestReissue = false) {
            console.log("Updating data...");
            $scope.selectedEnrollment = null;
            var selections = CurrentSelection.get();
            $scope.selectedTei = selections.tei;

            console.log("Selection", selections);

            var productOptions = {};
            var batchOptions = {};
            if (selections.optionSets["m8kSC9Sl2mE"]) {
                selections.optionSets["m8kSC9Sl2mE"].options.forEach(op => {
                    productOptions[op.code] = op.displayName;
                });
            }

            if (selections.optionSets["Sx0iIwAsj5S"]) {
                selections.optionSets["Sx0iIwAsj5S"].options.forEach(op => {
                    batchOptions[op.code] = op.displayName;
                });
            }


            if (selections && selections.tei) {
                $scope.certificate.teiId = selections.tei.trackedEntityInstance;
                selections.tei.attributes.forEach((att) => {
                    if ($scope.attrMap[att.attribute]) {
                        $scope.attrMap[att.attribute].value = att.value;
                    }
                });
            }

            let enrollment = selections.enrollments.find(e => e.program === "aLZQ5fSVdQc");

            if (enrollment && enrollment.events) {
                enrollment.events.forEach(ev => {
                    let eventData = {};
                    ev.dataValues.forEach(dv => {
                        eventData[dv.dataElement] = dv.value;
                    });

                    if ($scope.dosesMap[ev.programStage]) {
                        $scope.dosesMap[ev.programStage].date = eventData["HLnrx4pz8H1"] || ev.eventDate;
                        $scope.dosesMap[ev.programStage].given = eventData["sEgbpR5sGP6"] || eventData["N9h0aYEaS0i"];
                        $scope.dosesMap[ev.programStage].batch = batchOptions[eventData["xv7LXLV8RLT"]] || batchOptions[eventData["T8o6oTkS2OH"]];
                        $scope.dosesMap[ev.programStage].product = productOptions[eventData["R50Qdvrf768"]] || productOptions[eventData["J1HZdZNWqMb"]];
                        $scope.dosesMap[ev.programStage].type = eventData["J1HZdZNWqMb"] || eventData["R50Qdvrf768"];
                        $scope.dosesMap[ev.programStage].place = ev.orgUnitName;
                    }
                });
            }

            // query for existing cert
            if (!$scope.existChecked || $scope.existCheckedForNic !== $scope.certificate.nic.value) {
                $scope.existChecked = true;
                $scope.existCheckedForNic = $scope.certificate.nic.value;

                VaccineCertService.certReady2($scope.certificate.nic.value).then(setUrls).catch(err => {
                    console.warn("No certificate available in server side");
                }).finally(() => {
                    console.log("Finally....")
                    $scope.$apply(function () {
                        $scope.loading.all = false;
                        //$scope.reissueSuggestion = suggestReissue;
                    });
                });
            }

            // determine eligibility
            Object.values($scope.certificate).forEach(att => {
                if (att && att.required && !att.value) {
                    console.warn("Required field", att.id, "is not specified");
                    $scope.eligibility = false;
                }
            });

            if (!$scope.certificate.teiId) {
                $scope.eligibility = false;
            }

            console.log("Certificate", $scope.certificate);
        };



        $scope.$on('enrollmentEditing', function (event, args) {
            console.log("enrollment edited")
            updateData(true);
        });

        $scope.$on('teiupdated', function () {
            console.log("TEI updated");
            updateData(true);
        });

        $scope.$on('dashboardWidgets', function () {
            updateData();
        });

        $scope.$on('eventcreated', function (event, args) {
            console.log("Event created");
            updateData(true);
        });


        $scope.$on('dataEntryEventChanged', function (event, args) {
            console.log("Event changed");
            updateData(true);
        });

        $scope.$on('dataEntryControllerData', function (event, args) {
            console.log("data changed");
            updateData(true);
        });

        $scope.sendSMS = function () {
            VaccineCertService.sendSms($scope.certificate.phone.value, $scope.certificate.url1).then(rsp => {
                console.log("SMS sent", rsp);
            }).catch(err => {
                console.error("Error in sending sms", err);
                toastr.error(err.data.message, "Failed to send the message");
            });
        }

        $scope.issue = function () {
            console.log("Issuing certificate...", $scope.certificate);
            // validating
            if (!$scope.certificate.vaccinationNumber.value) {
                toastr.error("Vaccination Number can't be empty");
                return;
            } else if (!$scope.certificate.name.value) {
                toastr.error("Name can't be empty");
                return;
            } else if (!$scope.certificate.age.value) {
                toastr.error("Age can't be empty");
                return;
            } else if (!$scope.certificate.address.value) {
                toastr.error("Address can't be empty");
                return;
            } else if (!$scope.certificate.name.value) {
                toastr.error("Identity number can't be empty");
                return;
            } else if (!$scope.certificate.doses.dose1.date) {
                toastr.error("First dose not found");
                return;
            } else if (!$scope.certificate.doses.dose1.product) {
                toastr.error("First dose product not found");
                return;
            } else if (!$scope.certificate.doses.dose1.batch) {
                toastr.error("First dose batch not found");
                return;
            } else if (!$scope.certificate.doses.dose2.date) {
                toastr.error("Second dose not found");
                return;
            } else if (!$scope.certificate.doses.dose2.product) {
                toastr.error("Second dose product not found");
                return;
            } else if (!$scope.certificate.doses.dose2.batch) {
                toastr.error("Second dose batch not found");
                return;
            }

            $scope.loading.issue = true;

            // generate reports here
            let pdfDefs = getPdfDef(
                $scope.certificate.vaccinationNumber.value,
                $scope.certificate.name.value,
                $scope.certificate.gender.value,
                $scope.certificate.age.value,
                $scope.certificate.address.value,
                $scope.certificate.nic.value,
                $scope.certificate.doses.dose1,
                $scope.certificate.doses.dose2
            );

            const pdfColorDocGenerator = pdfMake.createPdf(pdfDefs[0]);

            pdfColorDocGenerator.download();

            $scope.loading.issue = false;

            // pdfColorDocGenerator.getBase64((pdf1) => {
            //     console.log(pdf1);
            // pdfTextDocGenerator.getBase64((pdf2) => {
            //     VaccineCertService.persist($scope.certificate.teiId, pdf1, pdf2).then((urls) => {
            //         console.log("Certificate issued...", urls);
            //         toastr.success("Certificate Issued");
            //         setUrls(urls);
            //         $scope.$apply(function () {
            //             $scope.loading.issue = false;
            //             $scope.reissueSuggestion = false;
            //         });
            //     }).catch(err => {
            //         console.warn("Error occurred when issuing the certificate", err);
            //         toastr.error(err, "Couldn't issue the certificate");
            //         $scope.$apply(function () {
            //             $scope.loading.issue = false;
            //             $scope.reissueSuggestion = false;
            //         });
            //     });
            // });
            // });
        }
    });