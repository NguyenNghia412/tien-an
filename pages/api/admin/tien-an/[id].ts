import admin from "@/services/common/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // Extract the dynamic parameter from the URL
  if (req.method === "DELETE") {
    try {
      const snapshot = await admin
        .firestore()
        .collection("tienan")
        .doc(id as string)
        .delete();

      res.status(200).json({ status: 200, message: "Deleted succesfully" });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Failed to fetch users" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
