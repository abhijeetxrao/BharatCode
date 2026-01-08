import { db } from "../libs/db.js";
export const checkAdmin = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if(!user||user.role!='ADMIN'){
      return res.json({message:"You are not authorize to access!"})
    }
    next();
  } catch (error) {
    console.log("Error checking in ADMIN role",error);
    return res.status(500).json({
      message:"Error checking in ADMIN"
    })
  }
};
