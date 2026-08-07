import { Controller, Get, Post, Delete, Body, Param, Headers, HttpStatus, HttpCode, UnauthorizedException, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Validar código
  @Get('guest/validate/:code')
  async validateGuest(@Param('code') code: string) {
    const guest = await this.appService.validateAccessCode(code);
    const vote = await this.appService.getVoteByCode(guest.codigoAcceso);
    return {
      ...guest,
      voted: !!vote,
      voteChoice: vote ? vote.opcion : null,
    };
  }

  // Confirmar asistencia
  @Post('guest/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmAttendance(
    @Body() body: { codigo: string; pasesConfirmados: number; asistira: boolean },
  ) {
    return this.appService.confirmAttendance(body.codigo, body.pasesConfirmados, body.asistira);
  }

  // Votar género
  @Post('vote')
  async voteGender(@Body() body: { codigo: string; opcion: 'nino' | 'nina' }) {
    return this.appService.voteGender(body.codigo, body.opcion);
  }

  // Resumen de votos
  @Get('vote/summary')
  async getVotesSummary() {
    return this.appService.getVotesSummary();
  }

  // Crear mensaje
  @Post('message')
  async addMessage(@Body() body: { nombre: string; contenido: string; codigo?: string; numeroIntegrante?: number }) {
    return this.appService.addMessage(body.nombre, body.contenido, body.codigo, body.numeroIntegrante);
  }

  // Obtener mensajes
  @Get('message')
  async getMessages(@Query('codigo') codigo?: string) {
    return this.appService.getMessages(codigo);
  }

  // Sembrar base de datos
  @Post('seed')
  async seedGuests() {
    return this.appService.seedGuests();
  }

  // --- ENDPOINTS ADMINISTRATIVOS ---

  private checkAdminAuth(adminPassword?: string) {
    if (!adminPassword || !this.appService.validateAdminPassword(adminPassword)) {
      throw new UnauthorizedException('Acceso no autorizado al panel administrativo.');
    }
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() body: { contrasena: string }) {
    this.checkAdminAuth(body.contrasena);
    return { success: true, message: 'Autenticación exitosa.' };
  }

  @Get('admin/summary')
  async getAdminSummary(@Headers('x-admin-password') adminPass?: string) {
    this.checkAdminAuth(adminPass);
    return this.appService.getAdminSummary();
  }

  @Get('admin/guests')
  async getAdminGuests(@Headers('x-admin-password') adminPass?: string) {
    this.checkAdminAuth(adminPass);
    return this.appService.getAllGuests();
  }

  @Post('admin/guests')
  async addAdminGuest(
    @Body() body: { nombre: string; pasesMaximos: number; codigoAcceso?: string },
    @Headers('x-admin-password') adminPass?: string,
  ) {
    this.checkAdminAuth(adminPass);
    return this.appService.addGuest(body.nombre, body.pasesMaximos, body.codigoAcceso);
  }

  @Delete('admin/guests/:id')
  async deleteAdminGuest(@Param('id') id: string, @Headers('x-admin-password') adminPass?: string) {
    this.checkAdminAuth(adminPass);
    return this.appService.deleteGuest(id);
  }

  @Delete('admin/messages/:id')
  async deleteAdminMessage(@Param('id') id: number, @Headers('x-admin-password') adminPass?: string) {
    this.checkAdminAuth(adminPass);
    return this.appService.deleteMessage(Number(id));
  }
}
