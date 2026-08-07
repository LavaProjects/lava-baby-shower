import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    validateGuest(code: string): Promise<{
        voted: boolean;
        voteChoice: "nino" | "nina" | null;
        id: string;
        nombre: string;
        codigoAcceso: string;
        pasesMaximos: number;
        pasesConfirmados: number;
        asistira: boolean;
        confirmado: boolean;
        confirmadoEn: Date;
    }>;
    confirmAttendance(body: {
        codigo: string;
        pasesConfirmados: number;
        asistira: boolean;
    }): Promise<import("./guest.entity").Guest>;
    voteGender(body: {
        codigo: string;
        opcion: 'nino' | 'nina';
    }): Promise<import("./vote.entity").Vote>;
    getVotesSummary(): Promise<{
        nino: number;
        nina: number;
        total: number;
        porcentajeNino: number;
        porcentajeNina: number;
    }>;
    addMessage(body: {
        nombre: string;
        contenido: string;
        codigo?: string;
        numeroIntegrante?: number;
    }): Promise<import("./message.entity").Message>;
    getMessages(codigo?: string): Promise<import("./message.entity").Message[]>;
    seedGuests(): Promise<{
        message: string;
        count: number;
    }>;
    private checkAdminAuth;
    adminLogin(body: {
        contrasena: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getAdminSummary(adminPass?: string): Promise<{
        totalInvitados: number;
        totalPasesMaximos: number;
        totalPasesConfirmados: number;
        totalConfirmados: number;
        totalAsistentes: number;
        totalNoAsistentes: number;
        votosNino: number;
        votosNina: number;
        votosTotal: number;
    }>;
    getAdminGuests(adminPass?: string): Promise<import("./guest.entity").Guest[]>;
    addAdminGuest(body: {
        nombre: string;
        pasesMaximos: number;
        codigoAcceso?: string;
    }, adminPass?: string): Promise<import("./guest.entity").Guest>;
    deleteAdminGuest(id: string, adminPass?: string): Promise<{
        success: boolean;
    }>;
    deleteAdminMessage(id: number, adminPass?: string): Promise<{
        success: boolean;
    }>;
}
