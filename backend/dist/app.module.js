"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const guest_entity_1 = require("./guest.entity");
const message_entity_1 = require("./message.entity");
const vote_entity_1 = require("./vote.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DATABASE_URL ? 'postgres' : 'better-sqlite3',
                database: process.env.DATABASE_URL ? undefined : 'database.sqlite',
                url: process.env.DATABASE_URL || undefined,
                entities: [guest_entity_1.Guest, message_entity_1.Message, vote_entity_1.Vote],
                synchronize: true,
                ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
            }),
            typeorm_1.TypeOrmModule.forFeature([guest_entity_1.Guest, message_entity_1.Message, vote_entity_1.Vote]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map