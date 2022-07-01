import { db } from '../database/firebase';

async function addDocument(collectionName, object) {
  const { key } = db.ref(collectionName).push();
  await db.ref(collectionName).child(key).set(object);
  return key;
}

function setDocumentById(collectionName, id, data) {
  return db.ref(`${collectionName}/${id}`).set(data);
}

function deleteDocumentById(collectionName, id) {
  return db.ref(`${collectionName}/${id}`).remove();
}

async function getDocumentsByRange(collectionName, query) {
  const { child, startAt, endAt } = query;
  const result = await db
    .ref(collectionName)
    .orderByChild(child)
    .startAt(startAt)
    .endAt(endAt)
    .once('value');
  if (!result.val()) return [];
  return Object.values(result.val()).map((e, i) => ({
    ...e,
    key: Object.keys(result.val())[i],
  }));
}

async function getDocumentById(collectionName, id) {
  const result = await db.ref(`${collectionName}/${id}`).once('value');
  return result.val();
}

async function getDocumentByQuery(collectionName, query) {
  const { key, value } = query;
  const docs = await db
    .ref(collectionName)
    .orderByChild(key)
    .equalTo(value)
    .once('value');
  if (!docs.val()) return [];
  return Object.values(docs.val());
}

async function getAllDocuments(collectionName) {
  const result = await db.ref(collectionName).once('value');
  if (!result.val()) return [];
  return Object.values(result.val()).map((e, i) => ({
    ...e,
    id: Object.keys(result.val())[i],
  }));
}

async function getQuantityDocumentsByQuery(collectionName, query) {
  const { key, value } = query;
  const result = await db
    .ref(collectionName)
    .orderByChild(key)
    .equalTo(value)
    .once('value');
  return {
    quantityCustomers: result.numChildren(),
  };
}

async function getAllDocumentsByQueryId(collectionName, query) {
  const { key, value } = query;
  const result = await db
    .ref(collectionName)
    .orderByChild(key)
    .equalTo(value)
    .once('value');
  if (!result.val()) return [];
  return Object.values(result.val()).map((e, i) => ({
    ...e,
    id: Object.keys(result.val())[i],
  }));
}

function getAllDocumentsRealTime(collectionName) {
  const data = [];
  db.ref(collectionName).on('value', (querySnapshot) => {
    querySnapshot.forEach((datoSnapshot) => Object.values(datoSnapshot.val()));
  });
  return data;
}

function updateDocument(collectionName, docId, dataUpdated) {
  return db.ref(collectionName).child(docId).update(dataUpdated);
}

export {
  deleteDocumentById,
  updateDocument,
  getAllDocuments,
  addDocument,
  setDocumentById,
  getDocumentById,
  getDocumentByQuery,
  getDocumentsByRange,
  getAllDocumentsRealTime,
  getAllDocumentsByQueryId,
  getQuantityDocumentsByQuery,
};
