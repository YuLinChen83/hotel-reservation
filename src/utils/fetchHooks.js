import {
  useState, useEffect, useReducer, useCallback,
} from 'react';
import axios from 'axios';

const fetchUtil = axios.create({
  headers: {
    Authorization: 'Bearer yTdnW0F4o0J3gvmBVSoflVGRZv7meB62b9VnQxu6ZvYN533wV5PR7vzbu57P',
    Accept: 'application/json',
  },
});

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: '',
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        errMsg: '',
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };
    default:
      throw new Error();
  }
};

export const useGetApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    errMsg: '',
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await fetchUtil.get(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export const usePostApi = (initialUrl, initialData) => {
  // const [postData, setPostData] = useState(payload);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    errMsg: '',
    data: initialData,
  });
  const callAPI = useCallback((payload) => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await fetchUtil.post(initialUrl, payload)
          .catch((error) => {
            console.log(error.response);
            if (error.response) {
              dispatch({ type: 'FETCH_FAILURE', payload: error.response.data.message });
            }
          });

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);
  return [state, callAPI];
};
