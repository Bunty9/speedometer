import { Op } from "sequelize";
import SpeedometerValues from "../models/speedometer-model";
import { Request, Response } from "express";

export const createValue = async (req: Request, res: Response) => {
    try {
        const { value } = req.body;
        const newValue = await SpeedometerValues.create({ value });
        res.status(201).json(newValue);
    } catch (error) {
        res.status(500).json({ message: "Failed to create value", error });
    }
};

export const getValues = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        const values = await SpeedometerValues.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
                },
            },
        });
        res.status(200).json(values);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve values", error });
    }
};

export const deleteStaleValues = async () => {
    try {
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); //stale values more than 3 days
        const deleted = await SpeedometerValues.destroy({
            where: {
                createdAt: {
                    [Op.lt]: threeDaysAgo,
                },
            },
        });
        console.log(deleted)
    } catch (error) {
        console.log({ message: "Failed to delete stale values", error });
    }
};