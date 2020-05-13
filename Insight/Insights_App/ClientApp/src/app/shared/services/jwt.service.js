"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(authService) {
        this.authService = authService;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs_1.BehaviorSubject(null);
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        if (this.authService.getAccessToken()) {
            request = this.addToken(request, this.authService.getAccessToken());
        }
        return next.handle(request).pipe(operators_1.catchError(function (error) {
            if (error instanceof http_1.HttpErrorResponse && error.status === 401) {
                return _this.handle401Error(request, next);
            }
            else {
                return rxjs_1.throwError(error);
            }
        }));
    };
    TokenInterceptor.prototype.addToken = function (request, token) {
        return request.clone({
            setHeaders: {
                'Authorization': "Bearer " + token
            }
        });
    };
    TokenInterceptor.prototype.handle401Error = function (request, next) {
        var _this = this;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.reGenerateAccessToken().pipe(operators_1.switchMap(function (token) {
                _this.isRefreshing = false;
                _this.refreshTokenSubject.next(token.access_token);
                return next.handle(_this.addToken(request, token.access_token));
            }));
        }
        else {
            return this.refreshTokenSubject.pipe(operators_1.filter(function (token) { return token != null; }), operators_1.take(1), operators_1.switchMap(function (accessToken) {
                return next.handle(_this.addToken(request, accessToken));
            }));
        }
    };
    TokenInterceptor = __decorate([
        core_1.Injectable()
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=jwt.service.js.map