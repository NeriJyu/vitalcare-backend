import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VitalData } from "./vitalData.model";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(() => VitalData, vital => vital.patient)
  vitals: VitalData[];
}
