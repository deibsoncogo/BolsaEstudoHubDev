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
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
