// Actions

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
    {
      id: "16800000",
      word: "ㅎ1ㅎ1",
      description: "히히를 변현한 단어...",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
      url: "www.naver.com",
      heard: true,
    },
  ],
};

// Action Creators
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dict/ADD": {
      const new_list = [
        ...state.list,
        {
          id: new Date().getTime() + "",
          word: action.dict.word,
          description: action.dict.description,
          example: action.dict.example,
          url: action.dict.url,
          heard: false,
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
      console.log(new_list);
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
    default:
      return state;
  }
}
