import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.model";

@Entity()
export class VitalData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  temperature: number;

  @Column("int")
  heartRate: number;

  @Column("float")
  oxygenLevel: number;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Patient, patient => patient.vitals)
  patient: Patient;
}
