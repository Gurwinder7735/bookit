import {createStore, applyMiddleware} from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';

const bindMiddleware = (middleware) => {
    if(process.NODE_ENV !== 'production'){
        middleware.push(logger)
    }   
    return applyMiddleware(...middleware)
} 

const reducer = (state, action) =>{

    if(action.type == HYDRATE){
        const nextState = {
            ...state,
            ...action.payload
        }

        return nextState
    }else{
                
          return reducers(state,action)
        
    }
}

const initStore  = () => {
    return createStore(reducer, bindMiddleware([thunk]))
}

export const wrapper = createWrapper(initStore)