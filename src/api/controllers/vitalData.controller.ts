import { VitalDataRepository } from "../repositories/vitalData.repository";

export class VitalDataController {
  private vitalDataRepository = new VitalDataRepository();

  findVitals(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const vitals = await this.vitalDataRepository.findVitals();

        resolve(vitals);
      } catch (err) {
        reject(err);
      }
    });
  }

  createVital(vital: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const createdVital = await this.vitalDataRepository.createVital(vital);

        resolve(createdVital);
      } catch (err) {
        reject(err);
      }
    });
  }
}
