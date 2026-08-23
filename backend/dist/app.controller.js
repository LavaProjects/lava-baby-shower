"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async validateGuest(code) {
        const guest = await this.appService.validateAccessCode(code);
        const vote = await this.appService.getVoteByCode(guest.codigoAcceso);
        return {
            ...guest,
            voted: !!vote,
            voteChoice: vote ? vote.opcion : null,
        };
    }
    async confirmAttendance(body) {
        return this.appService.confirmAttendance(body.codigo, body.pasesConfirmados, body.asistira);
    }
    async voteGender(body) {
        return this.appService.voteGender(body.codigo, body.opcion);
    }
    async getVotesSummary() {
        return this.appService.getVotesSummary();
    }
    async addMessage(body) {
        return this.appService.addMessage(body.nombre, body.contenido, body.codigo, body.numeroIntegrante);
    }
    async getMessages(codigo) {
        return this.appService.getMessages(codigo);
    }
    async seedGuests() {
        return this.appService.seedGuests();
    }
    checkAdminAuth(adminPassword) {
        if (!adminPassword || !this.appService.validateAdminPassword(adminPassword)) {
            throw new common_1.UnauthorizedException('Acceso no autorizado al panel administrativo.');
        }
    }
    async adminLogin(body) {
        this.checkAdminAuth(body.contrasena);
        return { success: true, message: 'Autenticación exitosa.' };
    }
    async getAdminSummary(adminPass) {
        this.checkAdminAuth(adminPass);
        return this.appService.getAdminSummary();
    }
    async getAdminGuests(adminPass) {
        this.checkAdminAuth(adminPass);
        return this.appService.getAllGuests();
    }
    async addAdminGuest(body, adminPass) {
        this.checkAdminAuth(adminPass);
        return this.appService.addGuest(body.nombre, body.pasesMaximos, body.codigoAcceso);
    }
    async updateAdminGuest(id, body, adminPass) {
        this.checkAdminAuth(adminPass);
        return this.appService.updateGuest(id, body.nombre, body.pasesMaximos, body.codigoAcceso);
    }
    async deleteAdminGuest(id, adminPass) {
        this.checkAdminAuth(adminPass);
        return this.appService.deleteGuest(id);
    }
    async deleteAdminMessage(id, adminPass) {
        this.checkAdminAuth(adminPass);
        return this.appService.deleteMessage(Number(id));
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('guest/validate/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "validateGuest", null);
__decorate([
    (0, common_1.Post)('guest/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "confirmAttendance", null);
__decorate([
    (0, common_1.Post)('vote'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "voteGender", null);
__decorate([
    (0, common_1.Get)('vote/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getVotesSummary", null);
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addMessage", null);
__decorate([
    (0, common_1.Get)('message'),
    __param(0, (0, common_1.Query)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "seedGuests", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Get)('admin/summary'),
    __param(0, (0, common_1.Headers)('x-admin-password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAdminSummary", null);
__decorate([
    (0, common_1.Get)('admin/guests'),
    __param(0, (0, common_1.Headers)('x-admin-password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAdminGuests", null);
__decorate([
    (0, common_1.Post)('admin/guests'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-admin-password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addAdminGuest", null);
__decorate([
    (0, common_1.Post)('admin/guests/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-admin-password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateAdminGuest", null);
__decorate([
    (0, common_1.Delete)('admin/guests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-admin-password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteAdminGuest", null);
__decorate([
    (0, common_1.Delete)('admin/messages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-admin-password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteAdminMessage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map