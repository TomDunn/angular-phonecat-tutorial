'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

    beforeEach(function() {
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('phonecatApp'))
    beforeEach(module('phonecatServices'));

    describe('PhoneListCtrl', function(){
        var scope,ctrl,$httpBackend;

        beforeEach(module('phonecatControllers'));

        beforeEach(inject(function(_$httpBackend_, $controller) {
            scope = {};
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('phones/phones.json').respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            ctrl  = $controller('PhoneListCtrl', {$scope:scope});
        }));

        it('should create populate phones model with 2 phones', function() {
            expect(scope.phones.length).toBe(0);
            $httpBackend.flush();
            expect(scope.phones.length).toBe(2);
            expect(scope.phones).toEqualData([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
        });

        it('should have the name set to Thomas', function() {
          expect(scope.name).toBe('Thomas');
        });

        it('should have the default orderBy set to age', function() {
            expect(scope.orderProp).toBe('age');
        });
    });

    describe('PhoneDetailCtrl', function() {
        var scope, $httpBackend, ctrl;
        var xyzPhoneData = function() {
            return {
                name: 'phone xyz',
                images: ['img1.jpg', 'img2.jpg']
            };
        };

        beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

            $routeParams.phoneId = 'xyz';
            scope = $rootScope.$new();
            ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
        }));

        it('should fetch phone detail', function() {
            $httpBackend.flush();

            expect(scope.phone.name).toEqual('phone xyz');
            expect(scope.phone.images.length).toBe(2);
            expect(scope.mainImageUrl).toEqual('img1.jpg');
        });

        it('should set mainImageUrl to img2.jpg', function() {
            expect(scope.mainImageUrl).toBeUndefined();
            scope.setImage('img2.jpg');
            expect(scope.mainImageUrl).toEqual('img2.jpg');
        });

    });
});
