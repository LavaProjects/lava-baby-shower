import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  contenido: string;

  @Column({ nullable: true })
  codigoAcceso?: string;

  @Column({ type: 'int', default: 1 })
  numeroIntegrante: number;

  @CreateDateColumn()
  fechaCreacion: Date;
}
