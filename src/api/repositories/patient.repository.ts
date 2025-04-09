import { Repository } from "typeorm";
import { Patient } from "../models/patient.model";
import { AppDataSource } from "../../database/database";

export class PatientRepository {
  private repo: Repository<Patient>;

  constructor() {
    this.repo = AppDataSource.getRepository(Patient);
  }

  findPatients(): Promise<Patient[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const patients = await this.repo.find({ relations: ["vitals"] });

        resolve(patients);
      } catch (err) {
        reject(err);
      }
    });
  }

  findPatientById(id: number): Promise<Patient> {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.repo.findOne({
          where: { id },
          relations: ["vitals"],
        });

        if (!patient) throw { err: "Patient not found", status: 404 };

        resolve(patient);
      } catch (err) {
        reject(err);
      }
    });
  }

  createPatient(data: Partial<Patient>): Promise<Patient> {
    return new Promise(async (resolve, reject) => {
      try {
        const newPatient = this.repo.create(data);
        const saved = await this.repo.save(newPatient);
        resolve(saved);
      } catch (err) {
        reject(err);
      }
    });
  }

  updatePatient(id: number, data: Partial<Patient>): Promise<Patient> {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.findPatientById(id);

        if (!data.name && !data.age) throw "No data provided to update";

        const updated = this.repo.merge(patient, data);
        const saved = await this.repo.save(updated);
        resolve(saved);
      } catch (err) {
        reject(err);
      }
    });
  }

  deletePatient(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.repo.delete(id);

        if (result.affected === 0)
          throw { err: "Patient not found", status: 404 };

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
