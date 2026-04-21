import {
  addDoc as firebaseAddDoc,
  collection as firebaseCollection,
  deleteDoc as firebaseDeleteDoc,
  doc as firebaseDoc,
  getDoc as firebaseGetDoc,
  getDocs as firebaseGetDocs,
  query as firebaseQuery,
  serverTimestamp,
  setDoc as firebaseSetDoc,
  updateDoc as firebaseUpdateDoc,
} from 'firebase/firestore';
import type { QueryConstraint } from 'firebase/firestore';
import { db } from './firebase';

type GenericRecord = Record<string, unknown>;

export async function addDocument(collectionName: string, data: GenericRecord = {}) {
  const docRef = await firebaseAddDoc(firebaseCollection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getDocument(collectionName: string, docId: string) {
  const docRef = firebaseDoc(db, collectionName, docId);
  const snapshot = await firebaseGetDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function getCollection(collectionName: string, queryConstraints: QueryConstraint[] = []) {
  const collectionRef = firebaseCollection(db, collectionName);
  const q = queryConstraints.length ? firebaseQuery(collectionRef, ...queryConstraints) : collectionRef;
  const snapshot = await firebaseGetDocs(q);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}

export async function updateDocument(collectionName: string, docId: string, data: GenericRecord = {}) {
  const docRef = firebaseDoc(db, collectionName, docId);
  await firebaseUpdateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collectionName: string, docId: string) {
  const docRef = firebaseDoc(db, collectionName, docId);
  await firebaseDeleteDoc(docRef);
}

export async function setDocument(collectionName: string, docId: string, data: GenericRecord = {}) {
  const docRef = firebaseDoc(db, collectionName, docId);
  await firebaseSetDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function queryCollection(collectionName: string, queryConstraints: QueryConstraint[] = []) {
  const collectionRef = firebaseCollection(db, collectionName);
  const q = firebaseQuery(collectionRef, ...queryConstraints);
  const snapshot = await firebaseGetDocs(q);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}
