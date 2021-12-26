/* eslint-disable indent */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { UserEntity } from "../../users/entities/userEntity";
import { AddressEntity } from "./addressEntity";

@Entity("companies")
export class CompanyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  corporateName: string;

  @Column()
  fantasyName: string;

  @Column()
  cnpj: number;

  @Column()
  departamento: string;

  @Column()
  contact: number;

  @Column()
  email: string;

  @Column()
  userOwnerId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userOwnerId" })
  user: UserEntity;

  @Column()
  addressId: string;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: "addressId" })
  address: AddressEntity[];

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
