import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { userRepository } from "../services/user.service.js";
import bcrypt from "bcrypt";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export async function getPrivateProfile(req, res) {
  try {
    const userId = req.user.sub; // Obtenemos el ID del token
    
    const userFromDb = await userRepository.findOneBy({ id: userId });

    if (!userFromDb) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
      message: `¡Hola, ${userFromDb.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
      userData: userFromDb,
    });

  } catch (error) {
    handleErrorServer(res, 500, "Error al obtener el perfil", error.message);
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.sub;
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await userRepository.save(user);
    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar perfil", error: error.message });
  }
}

export async function deleteProfile(req, res) {
  try {
    const userId = req.user.sub;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await userRepository.remove(user);
    return res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar perfil", error: error.message });
  }
}