'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

    beforeEach(module('phonecatFilters'));

    describe('checkmark', function() {
        it('should convert bools to unicode checkmarks or Xs', inject(function(checkmarkFilter) {
            expect(checkmarkFilter(true)).toBe('\u2713');
            expect(checkmarkFilter(false)).toBe('\u2718');
        }));
    });
});
