"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var jwt_service_1 = require("./jwt.service");
describe('JwtService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(jwt_service_1.JwtService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=jwt.service.spec.js.map