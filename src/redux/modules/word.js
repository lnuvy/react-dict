import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

// Actions
const LOAD = "dict/LOAD";
const LOAD_MORE = "dict/LOAD_MORE";

const ADD = "dict/ADD";
const EDIT = "dict/EDIT";
const DELETE = "dict/DELETE";
const HEARD = "dict/HEARD";

const initialState = {
  list: [],
  lastDate: 0,
};

// Action Creators
export const loadWord = (list, lastDate) => {
  return { type: LOAD, list, lastDate };
};

export const loadMoreWord = (list, lastDate) => {
  return { type: LOAD_MORE, list, lastDate };
};

export const addWord = (dict) => {
  return { type: ADD, dict };
};

export const editWord = (dict) => {
  return { type: EDIT, dict };
};

export const heardWord = (id) => {
  return { type: HEARD, id };
};

export const deleteWord = (id) => {
  return { type: DELETE, id };
};

// middlewares
export const loadDataFB = () => {
  return async function (dispatch) {
    const dicts_db = collection(db, "dicts");

    let word_list = [];
    let lastDate;

    const q = query(dicts_db, orderBy("date"), limit(4));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      word_list.push({ id: doc.id, ...doc.data() });
      lastDate = doc.data().date;
    });
    dispatch(loadWord(word_list, lastDate));
  };
};

export const loadMoreFB = (before_id) => {
  return async function (dispatch) {
    const dicts_db = collection(db, "dicts");
    let word_list = [];
    let lastDate = before_id;

    const q = query(dicts_db, orderBy("date"), startAfter(lastDate), limit(4));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        word_list.push({ id: doc.id, ...doc.data() });
        lastDate = doc.data().date;
      });
    }

    dispatch(loadMoreWord(word_list, lastDate));
  };
};

export const addDataFB = (data) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "dicts"), data);
    const _data = await getDoc(docRef);
    const dict = { id: _data.id, ..._data.data() };
    console.log("82: ", dict);

    dispatch(addWord(dict));
  };
};

export const editDataFB = (data) => {
  return async function (dispatch) {
    const docRef = doc(db, "dicts", data.id);
    await updateDoc(docRef, { ...data });

    dispatch(editWord(data));
  };
};

export const editToggleFB = (id, state) => {
  return async function (dispatch) {
    const docRef = doc(db, "dicts", id);
    await updateDoc(docRef, { heard: state });

    dispatch(heardWord(id));
  };
};

export const deleteDataFB = (id) => {
  return async function (dispatch) {
    const docRef = doc(db, "dicts", id);
    await deleteDoc(docRef);

    dispatch(deleteWord(id));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dict/LOAD": {
      return { list: action.list, lastDate: action.lastDate };
    }
    case "dict/LOAD_MORE":
      return {
        ...state,
        list: [...state.list, ...action.list],
        lastDate: action.lastDate,
      };
    case "dict/ADD": {
      const new_list = [
        ...state.list,
        {
          id: action.dict.id,
          heard: false,
          word: action.dict.word,
          description: action.dict.description,
          example: action.dict.example,
          url: action.dict.url,
          date: action.dict.date,
        },
      ];
      console.log(new_list);
      return { list: new_list };
    }
    case "dict/EDIT": {
      const new_list = state.list.map((l) => {
        if (action.dict.id === l.id) {
          return {
            id: action.dict.id,
            word: action.dict.word,
            description: action.dict.description,
            example: action.dict.example,
            url: action.dict.url,
            heard: action.dict.heard,
          };
        } else return l;
      });
      return { list: new_list };
    }
    case "dict/HEARD": {
      const new_list = state.list.map((l) => {
        if (action.id === l.id) {
          return {
            ...l,
            heard: !l.heard,
          };
        } else return l;
      });
      return { list: new_list };
    }
    case "dict/DELETE": {
      const new_list = state.list.filter((l) => {
        return action.id !== l.id;
      });
      return { list: new_list };
    }
    default:
      return state;
  }
}
