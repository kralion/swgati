// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import asyncHandler from '@libs/async.handler';
import db from '@libs/firebase';

const docRef = collection(db, 'documents');

const returnDocById = async (id) => {
  if (!id || id === 'undefined') return null;

  const docRef = doc(db, 'documents', id);
  return await getDoc(docRef);
};

const controllers = {
  GET: asyncHandler(async (req, res) => {
    const filters = Object.keys(req.query).reduce((acc, el) => {
      if (
        req.query[el] !== '' &&
        el !== 'pagina' &&
        el !== 'point' &&
        el !== 'last' &&
        el !== 'limit' &&
        el !== 'order'
      ) {
        return acc.concat(where(el, '==', req.query[el]));
      }
      return acc;
    }, []);

    const limitNumber = Number(req.query['limit']) || 5;
    const order =
      req.query['order'] === undefined ? 'desc' : String(req.query['order']);
    const latestDoc = await returnDocById(req.query['last']);
    let q;

    if (req.query['fecha'] === '' || req.query['point'] === 'home') {
      if (!!latestDoc) {
        q = query(
          docRef,
          ...filters,
          orderBy('fecha', order),
          startAfter(latestDoc),
          limit(limitNumber)
        );
      } else {
        q = query(
          docRef,
          ...filters,
          orderBy('fecha', order),
          limit(limitNumber)
        );
      }
    } else {
      if (!!latestDoc) {
        q = query(
          docRef,
          ...filters,
          startAfter(latestDoc),
          limit(limitNumber)
        );
      } else {
        q = query(docRef, ...filters, limit(limitNumber));
      }
    }

    const snapshot = await getDocs(q);
    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    res.status(200).json(documents);
  }),
  POST: asyncHandler(async (req, res) => {
    const document = req.body;
    await addDoc(docRef, document);
    res.status(201).json(document);
  })
};

export default function handler(req, res) {
  const controller = controllers[req.method];

  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
