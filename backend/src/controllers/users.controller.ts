import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import prisma from "../prisma";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.delete({
      where: { id: session.user.id },
    });
    res.json(user);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    res.json(user);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (error.code === "P2002") {
      return res.status(400).json({ message: "El email ya existe" });
    }
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export default {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
