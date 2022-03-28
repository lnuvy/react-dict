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
import { async } from "@firebase/util";

// Actions
const LOAD = "dict/LOAD";

const ADD = "dict/ADD";
const EDIT = "dict/EDIT";
const DELETE = "dict/DELETE";
const HEARD = "dict/HEARD";

const initialState = {
  list: [
    {
      id: "12345555",
      word: "ㅎ1ㅎ1",
      description: "히히를 변현한 단어...",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
      url: "www.naver.com",
      heard: false,
    },
    {
      id: "22222222",
      word: "ㅎ1ㅎ1",
      description: "히히를 변현한 단어...",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
      url: "www.naver.com",
      heard: false,
    },
  ],
};

// Action Creators
export const loadWord = (list) => {
  return { type: LOAD, list };
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
    const word_data = await getDocs(collection(db, "dicts"));

    let word_list = [];

    word_data.forEach((doc) => {
      word_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadWord(word_list));
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
      return { list: action.list };
    }
    case "dict/ADD": {
      console.log(action.dict);
      const new_list = [
        ...state.list,
        {
          id: action.dict.id,
          word: action.dict.word,
          description: action.dict.description,
          example: action.dict.example,
          url: action.dict.url,
          heard: false,
        },
      ];
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
      console.log(new_list);
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
