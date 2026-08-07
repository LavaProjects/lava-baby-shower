import { Repository } from 'typeorm';
import { Guest } from './guest.entity';
import { Message } from './message.entity';
import { Vote } from './vote.entity';
export declare class AppService {
    private readonly guestRepository;
    private readonly messageRepository;
    private readonly voteRepository;
    constructor(guestRepository: Repository<Guest>, messageRepository: Repository<Message>, voteRepository: Repository<Vote>);
    getHello(): string;
    validateAccessCode(codigo: string): Promise<Guest>;
    confirmAttendance(codigo: string, pasesConfirmados: number, asistira: boolean): Promise<Guest>;
    voteGender(codigo: string, opcion: 'nino' | 'nina'): Promise<Vote>;
    getVoteByCode(codigo: string): Promise<Vote | null>;
    getVotesSummary(): Promise<{
        nino: number;
        nina: number;
        total: number;
        porcentajeNino: number;
        porcentajeNina: number;
    }>;
    addMessage(nombre: string, contenido: string, codigoAcceso?: string, numeroIntegrante?: number): Promise<Message>;
    getMessages(codigoAcceso?: string): Promise<Message[]>;
    seedGuests(): Promise<{
        message: string;
        count: number;
    }>;
    validateAdminPassword(password: string): boolean;
    getAllGuests(): Promise<Guest[]>;
    addGuest(nombre: string, pasesMaximos: number, codigoAcceso?: string): Promise<Guest>;
    deleteGuest(id: string): Promise<{
        success: boolean;
    }>;
    deleteMessage(id: number): Promise<{
        success: boolean;
    }>;
    getAdminSummary(): Promise<{
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
}
