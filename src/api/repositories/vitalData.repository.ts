import { Repository } from "typeorm";
import { AppDataSource } from "../../database/database";
import { VitalData } from "../models/vitalData.model";

export class VitalDataRepository {
  private repo: Repository<VitalData>;

  constructor() {
    this.repo = AppDataSource.getRepository(VitalData);
  }

  findVitals(): Promise<VitalData[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const vitals = await this.repo.find({ relations: ["patient"] });
        resolve(vitals);
      } catch (err) {
        reject(err);
      }
    });
  }

  findVitalById(id: number): Promise<VitalData> {
    return new Promise(async (resolve, reject) => {
      try {
        const vital = await this.repo.findOne({
          where: { id },
          relations: ["patient"],
        });

        if (!vital) throw { err: "Vital data not found", status: 404 };

        resolve(vital);
      } catch (err) {
        reject(err);
      }
    });
  }

  createVital(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);

        const newVital = this.repo.create(data);

        console.log(newVital);

        const saved = await this.repo.save(newVital);
        resolve(saved);
      } catch (err) {
        console.log(err);

        reject(err);
      }
    });
  }

  updateVital(id: number, data: Partial<VitalData>): Promise<VitalData> {
    return new Promise(async (resolve, reject) => {
      try {
        const vital = await this.findVitalById(id);

        const updated = this.repo.merge(vital, data);
        const saved = await this.repo.save(updated);
        resolve(saved);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteVital(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.repo.delete(id);

        if (result.affected === 0)
          throw { err: "Vital data not found", status: 404 };

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
