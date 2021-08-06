"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    common_1.Module({
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor },
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map