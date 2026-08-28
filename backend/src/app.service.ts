import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './guest.entity';
import { Message } from './message.entity';
import { Vote } from './vote.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  getHello(): string {
    return '¡API de Baby Shower de Yolanda y Ulises activa!';
  }

  // Validar código de acceso
  async validateAccessCode(codigo: string): Promise<Guest> {
    const cleanCode = codigo.trim().toUpperCase();
    const guest = await this.guestRepository.findOne({ where: { codigoAcceso: cleanCode } });
    if (!guest) {
      throw new NotFoundException('El código de acceso no es válido.');
    }
    return guest;
  }

  // Confirmar asistencia (RSVP)
  async confirmAttendance(codigo: string, pasesConfirmados: number, asistira: boolean): Promise<Guest> {
    const guest = await this.validateAccessCode(codigo);

    if (asistira && (pasesConfirmados < 1 || pasesConfirmados > guest.pasesMaximos)) {
      throw new BadRequestException(`El número de pases confirmados debe estar entre 1 y ${guest.pasesMaximos}.`);
    }

    guest.asistira = asistira;
    guest.pasesConfirmados = asistira ? pasesConfirmados : 0;
    guest.confirmado = true;
    guest.confirmadoEn = new Date();

    return this.guestRepository.save(guest);
  }

  // Votar por género (Niño o Niña)
  async voteGender(codigo: string, opcion: 'nino' | 'nina'): Promise<Vote> {
    const guest = await this.validateAccessCode(codigo);
    const cleanCode = guest.codigoAcceso;

    if (opcion !== 'nino' && opcion !== 'nina') {
      throw new BadRequestException('Opción de voto no válida. Debe ser "nino" o "nina".');
    }

    let vote = await this.voteRepository.findOne({ where: { codigoAcceso: cleanCode } });
    if (vote) {
      vote.opcion = opcion;
    } else {
      vote = this.voteRepository.create({
        opcion,
        codigoAcceso: cleanCode,
      });
    }

    return this.voteRepository.save(vote);
  }

  // Obtener voto por código
  async getVoteByCode(codigo: string): Promise<Vote | null> {
    const cleanCode = codigo.trim().toUpperCase();
    return this.voteRepository.findOne({ where: { codigoAcceso: cleanCode } });
  }

  // Obtener resumen de votación
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

  // Agregar un mensaje
  async addMessage(
    nombre: string,
    contenido: string,
    codigoAcceso?: string,
    numeroIntegrante?: number,
  ): Promise<Message> {
    if (!nombre || nombre.trim().length === 0) {
      throw new BadRequestException('El nombre es requerido.');
    }
    if (!contenido || contenido.trim().length === 0) {
      throw new BadRequestException('El mensaje no puede estar vacío.');
    }

    let cleanCode = '';
    let finalIntegrante = 1;

    if (codigoAcceso) {
      cleanCode = codigoAcceso.trim().toUpperCase();
      const guest = await this.guestRepository.findOne({ where: { codigoAcceso: cleanCode } });
      if (!guest) {
        throw new BadRequestException('El código de invitación no es válido.');
      }
      if (!guest.confirmado) {
        throw new BadRequestException('Debes confirmar tu asistencia antes de dejar un mensaje.');
      }

      finalIntegrante = Number(numeroIntegrante) || 1;
      if (finalIntegrante < 1 || finalIntegrante > guest.pasesConfirmados) {
        throw new BadRequestException(
          `El número de integrante debe estar entre 1 y ${guest.pasesConfirmados}.`,
        );
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

  // Obtener mensajes (filtrados opcionalmente por código de acceso de la familia)
  async getMessages(codigoAcceso?: string): Promise<Message[]> {
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

  // Semilla de datos (Seeder) para pruebas
  async seedGuests(): Promise<{ message: string; count: number }> {
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

    const saved: Guest[] = [];
    for (const g of sampleGuests) {
      const guest = this.guestRepository.create(g);
      saved.push(await this.guestRepository.save(guest));
    }

    return { message: 'Invitados semilla creados con éxito.', count: saved.length };
  }

  // Verificar contraseña de administrador
  validateAdminPassword(password: string): boolean {
    const adminPass = process.env.ADMIN_PASSWORD || 'BFC2026';
    return password === adminPass;
  }

  // Obtener todos los invitados con su voto
  async getAllGuests(): Promise<any[]> {
    const guests = await this.guestRepository.find({
      order: { nombre: 'ASC' },
    });
    const votes = await this.voteRepository.find();
    const voteMap = new Map<string, 'nino' | 'nina'>();
    votes.forEach((v) => {
      voteMap.set(v.codigoAcceso, v.opcion);
    });

    return guests.map((guest) => ({
      ...guest,
      voto: voteMap.get(guest.codigoAcceso) || null,
    }));
  }

  // Agregar nuevo invitado
  async addGuest(nombre: string, pasesMaximos: number, codigoAcceso?: string): Promise<Guest> {
    if (!nombre || nombre.trim().length === 0) {
      throw new BadRequestException('El nombre del invitado es requerido.');
    }
    if (pasesMaximos < 1) {
      throw new BadRequestException('El invitado debe tener al menos 1 pase.');
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
    } else {
      const existing = await this.guestRepository.findOne({ where: { codigoAcceso: finalCode } });
      if (existing) {
        throw new BadRequestException(`El código de acceso "${finalCode}" ya está en uso.`);
      }
    }

    const guest = this.guestRepository.create({
      nombre: nombre.trim(),
      pasesMaximos,
      codigoAcceso: finalCode,
    });

    return this.guestRepository.save(guest);
  }

  // Eliminar un invitado
  async deleteGuest(id: string): Promise<{ success: boolean }> {
    const guest = await this.guestRepository.findOne({ where: { id } });
    if (!guest) {
      throw new NotFoundException('Invitado no encontrado.');
    }
    await this.voteRepository.delete({ codigoAcceso: guest.codigoAcceso });
    await this.messageRepository.delete({ codigoAcceso: guest.codigoAcceso });
    await this.guestRepository.remove(guest);
    return { success: true };
  }

  // Actualizar un invitado existente
  async updateGuest(id: string, nombre: string, pasesMaximos: number, codigoAcceso?: string): Promise<Guest> {
    const guest = await this.guestRepository.findOne({ where: { id } });
    if (!guest) {
      throw new NotFoundException('Invitado no encontrado.');
    }

    if (codigoAcceso) {
      const cleanCode = codigoAcceso.trim().toUpperCase();
      if (cleanCode !== guest.codigoAcceso) {
        const existing = await this.guestRepository.findOne({ where: { codigoAcceso: cleanCode } });
        if (existing) {
          throw new BadRequestException('El código de acceso ya está asignado a otro invitado.');
        }
        // Si cambia el código, actualizamos en cascada las relaciones de votos y mensajes
        await this.voteRepository.update({ codigoAcceso: guest.codigoAcceso }, { codigoAcceso: cleanCode });
        await this.messageRepository.update({ codigoAcceso: guest.codigoAcceso }, { codigoAcceso: cleanCode });
        guest.codigoAcceso = cleanCode;
      }
    }

    guest.nombre = nombre.trim();
    guest.pasesMaximos = pasesMaximos;
    return this.guestRepository.save(guest);
  }


  // Eliminar un mensaje (Moderación)
  async deleteMessage(id: number): Promise<{ success: boolean }> {
    const msg = await this.messageRepository.findOne({ where: { id } });
    if (!msg) {
      throw new NotFoundException('Mensaje no encontrado.');
    }
    await this.messageRepository.remove(msg);
    return { success: true };
  }

  // Obtener resumen administrativo
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
        } else {
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
}
