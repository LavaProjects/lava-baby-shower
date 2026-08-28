import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  codigoAcceso: string;

  @Column({ default: 2 })
  pasesMaximos: number;

  @Column({ default: 0 })
  pasesConfirmados: number;

  @Column({ default: false })
  asistira: boolean;

  @Column({ default: false })
  confirmado: boolean; // Si ya completó el formulario

  @Column({ nullable: true })
  confirmadoEn?: Date;
}
