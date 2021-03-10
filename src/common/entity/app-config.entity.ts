import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("app_config")
export class AppConfig extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "app_config_id" })
  appConfigId: number;

  @Column("varchar", { name: "app_config_key", length: 100 })
  appConfigKey: string;

  @Column("varchar", { name: "app_config_group", length: 100 })
  appConfigGroup: string;

  @Column("varchar", { name: "app_config_value", length: 255 })
  appConfigValue: string;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("varchar", { name: "updated_by", length: 100 })
  updatedBy: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("varchar", { name: "created_by", length: 100 })
  createdBy: string;

  @Column("smallint", { name: "app_config_public", width: 1 })
  appConfigPublic: boolean;
}
