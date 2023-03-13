import { Table, Model, Column, DataType, PrimaryKey, Default, AllowNull, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "maps",
})

export class Map extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id: any;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    public map_name: string;

    @AllowNull(false)
    @Column(DataType.GEOMETRY)
    public map_data: any; 

    @AllowNull(false)
    @Column(DataType.TEXT)
    public sources: string;

    @CreatedAt
    public created_at: Date;
  
    @UpdatedAt
    public updated_at: Date;
}