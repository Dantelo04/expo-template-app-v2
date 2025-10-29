import { Request, Response } from "express";
import prisma from "../prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

const getRecords = async (req: Request, res: Response) => {
  try {
    const records = await prisma.record.findMany();
    res.json(records);
  } catch (error) {
    console.log("Error fetching records:", error);
    res.status(500).json({ message: "Error al obtener registros" });
  }
};

const getRecordsFromUser = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const records = await prisma.record.findMany({
      where: { userId: id },
    });
    res.json(records);
  } catch (error) {
    console.log("Error fetching records:", error);
    res.status(500).json({ message: "Error al obtener registros" });
  }
};

const createRecord = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body;
    console.log(data);
    const record = await prisma.record.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });
    res.json(record);
  } catch (error) {
    console.log("Error creating record:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const deleteRecord = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    
    const record = await prisma.record.delete({
      where: { id: id, userId: session.user.id },
    });
    
    res.json(record);
  } catch (error) {
    console.log("Error deleting record:", error);
    res.status(500).json({ message: "Error al eliminar registro" });
  }
};

const deleteManyRecords = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { ids } = req.body;
    console.log("ids", ids);
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or empty IDs array" });
    }
    const result = await prisma.record.deleteMany({
      where: {
        id: {
          in: ids,
        },
        userId: session.user.id,
      },
    });
    
    console.log(`Attempted to delete ${ids.length} records, actually deleted ${result.count} records for user ${session.user.id}`);
    
    res.json({ 
      deletedCount: result.count, 
      requestedIds: ids,
      message: `Successfully deleted ${result.count} records`
    });
  } catch (error) {
    console.log("Error deleting records:", error, req.body);
    res.status(500).json({ message: "Error al eliminar registros" });
  }
};

const createManyRecords = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body;
    const records = await prisma.record.createMany({
      data: data,
    });
    res.json(records);
  } catch (error) {
    console.log("Error creating records:", error);
    res.status(500).json({ message: "Error al crear registros" });
  }
};

const updateRecord = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const data = req.body;
    const record = await prisma.record.update({
      where: { id: id, userId: session.user.id },
      data: data,
    });
    res.json(record);
  } catch (error) {
    console.log("Error updating record:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

export default {
  getRecords,
  getRecordsFromUser,
  createRecord,
  deleteRecord,
  deleteManyRecords,
  createManyRecords,
  updateRecord,
};
