import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  opcion: 'nino' | 'nina';

  @Column({ unique: true })
  codigoAcceso: string;

  @CreateDateColumn()
  fechaCreacion: Date;
}
