import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "quiet-grammar-bszp9",
  appId: "1:695437400606:web:d826909de9e173bb092c0f",
  apiKey: "AIzaSyCrhPkOKv4bw_s_wOZ6EHoFW02pb3bB2WI",
  authDomain: "quiet-grammar-bszp9.firebaseapp.com",
  storageBucket: "quiet-grammar-bszp9.firebasestorage.app",
  messagingSenderId: "695437400606",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-apexos-91042d7f-dd34-4bfc-8d63-9ac624eaf6b2");
export const storage = getStorage(app);

const CHUNK_SIZE = 900000;

export async function saveLargeData(id: string, dataStr: string, timestamp?: number) {
  if (!dataStr) dataStr = "";
  const chunks = [];
  for (let i = 0; i < dataStr.length; i += CHUNK_SIZE) {
    chunks.push(dataStr.substring(i, i + CHUNK_SIZE));
  }
  
  const batch = writeBatch(db);
  batch.set(doc(db, 'large_data', id), { 
    numChunks: chunks.length,
    updatedAt: timestamp || Date.now()
  });
  
  for (let i = 0; i < chunks.length; i++) {
    batch.set(doc(db, `large_data/${id}/chunks`, `chunk_${i}`), { data: chunks[i] });
  }
  
  // Clear potential old chunks up to an arbitrary safe limit if shrinking (we assume no more than 10 chunks normally)
  for (let i = chunks.length; i < 15; i++) {
    batch.delete(doc(db, `large_data/${id}/chunks`, `chunk_${i}`));
  }
  
  await batch.commit();
}

export async function loadLargeData(id: string) {
  const metaSnap = await getDoc(doc(db, 'large_data', id));
  if (!metaSnap.exists()) return null;
  const numChunks = metaSnap.data().numChunks;
  const updatedAt = metaSnap.data().updatedAt || 0;
  let fullData = '';
  for (let i = 0; i < numChunks; i++) {
    const chunkSnap = await getDoc(doc(db, `large_data/${id}/chunks`, `chunk_${i}`));
    if (chunkSnap.exists()) {
      fullData += chunkSnap.data().data;
    }
  }
  return { data: fullData, updatedAt };
}

