import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
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
  lastValue: 0,
};

// Action Creators
export const loadWord = (list, lastValue) => {
  return { type: LOAD, list, lastValue };
};

export const loadMoreWord = (list, lastValue) => {
  return { type: LOAD_MORE, list, lastValue };
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
const LOAD_COUNT = 10;

export const loadDataFB = () => {
  return async function (dispatch) {
    const querySnapshot = await getDocs(collection(db, "dicts"));

    let word_list = [];
    let lastId;
    querySnapshot.forEach((doc) => {
      if (word_list.length < LOAD_COUNT) {
        word_list.push({ id: doc.id, ...doc.data() });
        console.log("push:", { id: doc.id, ...doc.data() });
      } else {
        lastId = doc.id;
        return;
      }
    });
    console.log(word_list, lastId);
    dispatch(loadWord(word_list, lastId));
  };
};

export const loadMoreFB = (before_id) => {
  return async function (dispatch) {
    const querySnapshot = await getDocs(collection(db, "dicts"));

    let word_list = [];
    let lastValue = 0;
    let beforeId = before_id;
    let listCount = 0;

    querySnapshot.forEach((doc, i = 0) => {
      i++;
      lastValue++;
      if (doc.id === beforeId) {
        word_list.push({ id: doc.id, ...doc.data() });
        console.log("이때 lastValue 값:", lastValue);
      }
      if (listCount) {
        listCount++;
      }
      console.log(i);
      console.log("listCount:", listCount);
      console.log("lastValue:", lastValue);
    });
    console.log(word_list, lastValue);
    dispatch(loadMoreWord(word_list, lastValue));
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
      return { list: action.list, lastValue: action.lastValue };
    }
    case "dict/LOAD_MORE":
      return {
        ...state,
        list: [...state.list, ...action.list],
        lastValue: action.lastValue,
      };
    case "dict/ADD": {
      console.log(action.dict);
      const new_list = [
        ...state.list,
        {
          id: action.dict.id,
          heard: false,
          word: action.dict.word,
          description: action.dict.description,
          example: action.dict.example,
          url: action.dict.url,
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
