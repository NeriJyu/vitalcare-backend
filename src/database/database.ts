import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Patient } from '../api/models/patient.model';
import { VitalData } from '../api/models/vitalData.model';
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // true só em desenvolvimento
  logging: true,
  entities: ['src/api/models/**/*.model.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
});