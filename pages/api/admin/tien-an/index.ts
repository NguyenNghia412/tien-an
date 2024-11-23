import admin from "@/services/common/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const snapshot = await admin
        .firestore()
        .collection("tienan")
        .orderBy("transDate", "asc")
        .get();
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(users);
    } catch (error) {
      console.log("ERROR GET PAGING => ", error);
      res.status(500).json({ status: 500, message: "Failed to fetch users" });
    }
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const docRef = await admin.firestore().collection("tienan").add(data);
      res.status(201).json({
        status: 200,
        message: "Created",
        data: { id: docRef.id, ...data },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
