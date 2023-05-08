import asyncHandler from "@libs/async.handler";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import db from "@libs/firebase";

const controllers = {
  GET: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const docRef = doc(db, "documents", id);
    const snapshot = await getDoc(docRef);
    res.status(200).json(snapshot.data());
  }),
  PATCH: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const document = req.body;
    const docRef = doc(db, "documents", `${id}`);
    await updateDoc(docRef, document);
    res.status(200).json(id);
  }),
  DELETE: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const document = req.body;
    await deleteDoc(collection(db, "documents", id));
    res.status(200).json(document);
  }),
};

export default function handler(req, res) {
  const controller = controllers[req.method];
  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({
      messge: "Method not allowed",
    });
  }
}
