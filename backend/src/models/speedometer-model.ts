import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({ tableName: "speedometer-values", timestamps: true })
class SpeedometerValues extends Model {
    @PrimaryKey
    @Column({ type: DataTypes.INTEGER, autoIncrement: true })
    public id!: number;

    @Column({ type: DataTypes.STRING, allowNull: false })
    public value!: string;

}

export default SpeedometerValues;


