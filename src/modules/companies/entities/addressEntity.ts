/* eslint-disable indent */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("addresses")
export class AddressEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  publicPlace: string;

  @Column()
  number: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
