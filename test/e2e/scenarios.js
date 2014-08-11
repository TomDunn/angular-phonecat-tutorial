'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('phone list app', function() {

    beforeEach(function() {
        browser.get('app/index.html');
    });

    it('should filter the phone list using text in search box', function() {
        var phoneList = element.all(by.repeater('phone in phones'));
        var query     = element(by.model('query'));

        // total of twenty phones
        expect(phoneList.count()).toBe(20);

        query.sendKeys('nexus');
        expect(phoneList.count()).toBe(1);

        query.clear();
        query.sendKeys('motorola');

        // there are 8 moto phones
        expect(phoneList.count()).toBe(8);
    });

    it('should be possible to control order of results via dropdown', function() {
        var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));
        var query           = element(by.model('query'));

        function getNames() {
            return phoneNameColumn.map(function(elm) {
                return elm.getText();
            });
        }

        query.sendKeys('tablet');

        expect(getNames()).toEqual([
            "Motorola XOOM\u2122 with Wi-Fi",
            "MOTOROLA XOOM\u2122"
        ]);

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

        expect(getNames()).toEqual([
            "MOTOROLA XOOM\u2122",
            "Motorola XOOM\u2122 with Wi-Fi"
        ]);
    });

    it('should render phone specific links', function() {
        var query = element(by.model('query'));

        query.sendKeys('nexus');

        element.all(by.css('.phones.list li a')).first().click();

        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/phones/nexus-s');
        });
    });

    it('should redirect to index.html#/phones', function() {
        browser.get('app/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/phones');
        });
    });

    describe('Phone list view', function() {
        beforeEach(function() {
            browser.get('app/index.html#phones');
        });
    });

    describe('Phone detail views', function() {
        beforeEach(function() {
            browser.get('app/index.html#/phones/nexus-s');
        });

        it('should display placeholder page with phoneId', function() {
            expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
        });

        it('should display the first phone image as the main phone image', function() {
            expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });

        it('should should swap the main image if a thumb is clicked', function() {
            element(by.css('.phone-thumbs li:nth-child(3) img')).click();
            expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

            element(by.css('.phone-thumbs li:nth-child(1) img')).click();
            expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });
    });
});
