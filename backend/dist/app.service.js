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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const guest_entity_1 = require("./guest.entity");
const message_entity_1 = require("./message.entity");
const vote_entity_1 = require("./vote.entity");
let AppService = class AppService {
    guestRepository;
    messageRepository;
    voteRepository;
    constructor(guestRepository, messageRepository, voteRepository) {
        this.guestRepository = guestRepository;
        this.messageRepository = messageRepository;
        this.voteRepository = voteRepository;
    }
    getHello() {
        return '¡API de Baby Shower de Yolanda y Ulises activa!';
    }
    async validateAccessCode(codigo) {
        const cleanCode = codigo.trim().toUpperCase();
        const guest = await this.guestRepository.findOne({ where: { codigoAcceso: cleanCode } });
        if (!guest) {
            throw new common_1.NotFoundException('El código de acceso no es válido.');
        }
        return guest;
    }
    async confirmAttendance(codigo, pasesConfirmados, asistira) {
        const guest = await this.validateAccessCode(codigo);
        if (asistira && (pasesConfirmados < 1 || pasesConfirmados > guest.pasesMaximos)) {
            throw new common_1.BadRequestException(`El número de pases confirmados debe estar entre 1 y ${guest.pasesMaximos}.`);
        }
        guest.asistira = asistira;
        guest.pasesConfirmados = asistira ? pasesConfirmados : 0;
        guest.confirmado = true;
        guest.confirmadoEn = new Date();
        return this.guestRepository.save(guest);
    }
    async voteGender(codigo, opcion) {
        const guest = await this.validateAccessCode(codigo);
        const cleanCode = guest.codigoAcceso;
        if (opcion !== 'nino' && opcion !== 'nina') {
            throw new common_1.BadRequestException('Opción de voto no válida. Debe ser "nino" o "nina".');
        }
        let vote = await this.voteRepository.findOne({ where: { codigoAcceso: cleanCode } });
        if (vote) {
            vote.opcion = opcion;
        }
        else {
            vote = this.voteRepository.create({
                opcion,
                codigoAcceso: cleanCode,
            });
        }
        return this.voteRepository.save(vote);
    }
    async getVoteByCode(codigo) {
        const cleanCode = codigo.trim().toUpperCase();
        return this.voteRepository.findOne({ where: { codigoAcceso: cleanCode } });
    }
    async getVotesSummary() {
        const nino = await this.voteRepository.count({ where: { opcion: 'nino' } });
        const nina = await this.voteRepository.count({ where: { opcion: 'nina' } });
        const total = nino + nina;
        return {
            nino,
            nina,
            total,
            porcentajeNino: total > 0 ? Math.round((nino / total) * 100) : 0,
            porcentajeNina: total > 0 ? Math.round((nina / total) * 100) : 0,
        };
    }
    async addMessage(nombre, contenido, codigoAcceso, numeroIntegrante) {
        if (!nombre || nombre.trim().length === 0) {
            throw new common_1.BadRequestException('El nombre es requerido.');
        }
        if (!contenido || contenido.trim().length === 0) {
            throw new common_1.BadRequestException('El mensaje no puede estar vacío.');
        }
        let cleanCode = '';
        let finalIntegrante = 1;
        if (codigoAcceso) {
            cleanCode = codigoAcceso.trim().toUpperCase();
            const guest = await this.guestRepository.findOne({ where: { codigoAcceso: cleanCode } });
            if (!guest) {
                throw new common_1.BadRequestException('El código de invitación no es válido.');
            }
            if (!guest.confirmado) {
                throw new common_1.BadRequestException('Debes confirmar tu asistencia antes de dejar un mensaje.');
            }
            finalIntegrante = Number(numeroIntegrante) || 1;
            if (finalIntegrante < 1 || finalIntegrante > guest.pasesConfirmados) {
                throw new common_1.BadRequestException(`El número de integrante debe estar entre 1 y ${guest.pasesConfirmados}.`);
            }
            const existingMessage = await this.messageRepository.findOne({
                where: { codigoAcceso: cleanCode, numeroIntegrante: finalIntegrante },
            });
            if (existingMessage) {
                existingMessage.nombre = nombre.trim();
                existingMessage.contenido = contenido.trim();
                return this.messageRepository.save(existingMessage);
            }
        }
        const message = this.messageRepository.create({
            nombre: nombre.trim(),
            contenido: contenido.trim(),
            codigoAcceso: cleanCode || undefined,
            numeroIntegrante: finalIntegrante,
        });
        return this.messageRepository.save(message);
    }
    async getMessages(codigoAcceso) {
        if (codigoAcceso) {
            const cleanCode = codigoAcceso.trim().toUpperCase();
            return this.messageRepository.find({
                where: { codigoAcceso: cleanCode },
                order: { numeroIntegrante: 'ASC' },
            });
        }
        return this.messageRepository.find({
            order: { fechaCreacion: 'DESC' },
        });
    }
    async seedGuests() {
        const existingCount = await this.guestRepository.count();
        if (existingCount > 0) {
            return { message: 'La base de datos ya contiene invitados.', count: existingCount };
        }
        const sampleGuests = [
            { nombre: 'Familia Ramírez Lavariega', codigoAcceso: 'FAM001', pasesMaximos: 4 },
            { nombre: 'Sofía Lavariega', codigoAcceso: 'SOF002', pasesMaximos: 2 },
            { nombre: 'Carlos Ramírez', codigoAcceso: 'CAR003', pasesMaximos: 2 },
            { nombre: 'Dra. Yolanda Lavariega', codigoAcceso: 'YOL004', pasesMaximos: 1 },
            { nombre: 'Familia Gómez Suárez', codigoAcceso: 'GOM005', pasesMaximos: 3 },
            { nombre: 'Invitado Especial 1', codigoAcceso: 'INV006', pasesMaximos: 2 },
            { nombre: 'Invitado Especial 2', codigoAcceso: 'INV007', pasesMaximos: 2 },
        ];
        const saved = [];
        for (const g of sampleGuests) {
            const guest = this.guestRepository.create(g);
            saved.push(await this.guestRepository.save(guest));
        }
        return { message: 'Invitados semilla creados con éxito.', count: saved.length };
    }
    validateAdminPassword(password) {
        const adminPass = process.env.ADMIN_PASSWORD || 'BFC2026';
        return password === adminPass;
    }
    async getAllGuests() {
        return this.guestRepository.find({
            order: { nombre: 'ASC' },
        });
    }
    async addGuest(nombre, pasesMaximos, codigoAcceso) {
        if (!nombre || nombre.trim().length === 0) {
            throw new common_1.BadRequestException('El nombre del invitado es requerido.');
        }
        if (pasesMaximos < 1) {
            throw new common_1.BadRequestException('El invitado debe tener al menos 1 pase.');
        }
        let finalCode = codigoAcceso ? codigoAcceso.trim().toUpperCase() : '';
        if (!finalCode) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let unique = false;
            while (!unique) {
                let code = '';
                for (let i = 0; i < 6; i++) {
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                const existing = await this.guestRepository.findOne({ where: { codigoAcceso: code } });
                if (!existing) {
                    finalCode = code;
                    unique = true;
                }
            }
        }
        else {
            const existing = await this.guestRepository.findOne({ where: { codigoAcceso: finalCode } });
            if (existing) {
                throw new common_1.BadRequestException(`El código de acceso "${finalCode}" ya está en uso.`);
            }
        }
        const guest = this.guestRepository.create({
            nombre: nombre.trim(),
            pasesMaximos,
            codigoAcceso: finalCode,
        });
        return this.guestRepository.save(guest);
    }
    async deleteGuest(id) {
        const guest = await this.guestRepository.findOne({ where: { id } });
        if (!guest) {
            throw new common_1.NotFoundException('Invitado no encontrado.');
        }
        await this.voteRepository.delete({ codigoAcceso: guest.codigoAcceso });
        await this.messageRepository.delete({ codigoAcceso: guest.codigoAcceso });
        await this.guestRepository.remove(guest);
        return { success: true };
    }
    async updateGuest(id, nombre, pasesMaximos, codigoAcceso) {
        const guest = await this.guestRepository.findOne({ where: { id } });
        if (!guest) {
            throw new common_1.NotFoundException('Invitado no encontrado.');
        }
        if (codigoAcceso) {
            const cleanCode = codigoAcceso.trim().toUpperCase();
            if (cleanCode !== guest.codigoAcceso) {
                const existing = await this.guestRepository.findOne({ where: { codigoAcceso: cleanCode } });
                if (existing) {
                    throw new common_1.BadRequestException('El código de acceso ya está asignado a otro invitado.');
                }
                await this.voteRepository.update({ codigoAcceso: guest.codigoAcceso }, { codigoAcceso: cleanCode });
                await this.messageRepository.update({ codigoAcceso: guest.codigoAcceso }, { codigoAcceso: cleanCode });
                guest.codigoAcceso = cleanCode;
            }
        }
        guest.nombre = nombre.trim();
        guest.pasesMaximos = pasesMaximos;
        return this.guestRepository.save(guest);
    }
    async deleteMessage(id) {
        const msg = await this.messageRepository.findOne({ where: { id } });
        if (!msg) {
            throw new common_1.NotFoundException('Mensaje no encontrado.');
        }
        await this.messageRepository.remove(msg);
        return { success: true };
    }
    async getAdminSummary() {
        const totalInvitados = await this.guestRepository.count();
        const guests = await this.guestRepository.find();
        let totalPasesMaximos = 0;
        let totalPasesConfirmados = 0;
        let totalConfirmados = 0;
        let totalAsistentes = 0;
        let totalNoAsistentes = 0;
        guests.forEach((g) => {
            totalPasesMaximos += g.pasesMaximos;
            if (g.confirmado) {
                totalConfirmados++;
                if (g.asistira) {
                    totalAsistentes++;
                    totalPasesConfirmados += g.pasesConfirmados;
                }
                else {
                    totalNoAsistentes++;
                }
            }
        });
        const voteSummary = await this.getVotesSummary();
        return {
            totalInvitados,
            totalPasesMaximos,
            totalPasesConfirmados,
            totalConfirmados,
            totalAsistentes,
            totalNoAsistentes,
            votosNino: voteSummary.nino,
            votosNina: voteSummary.nina,
            votosTotal: voteSummary.total,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(guest_entity_1.Guest)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(2, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map