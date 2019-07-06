const ADD_POINT = "ADD_POINT";
const REMOVE_POINT = "REMOVE_POINT";
const CHANGE_NAME = "CHANGE_NAME";

// ***Reducer***

const addPoint = (state = {}, action) => {
    switch(action.type){
        case ADD_POINT: 
             console.log("addPoint reducer triggered");
             return {
                 points: state.points++,
                 ...state,
                 };
        default :
            return state;
    }
}

const removePoint = (state = {}, action) => {
    switch(action.type){
        case REMOVE_POINT:
             console.log("removePoint reducer triggered");
             return {
                  points: state.points--,
                 ...state
             }
        default:
            return state;
    }
}

const changeName = (state = {}, action) => {
    switch(action.type){
        case CHANGE_NAME:
             console.log("changeName reducer triggered");
              state.name = action.name
             return {
                 ...state
             }
    }
}


// ***Combine reducer and store***
function combineReducer(reducers){
    let state = {
        ...reducers
    }

    return {
        createStore : (reducers) =>{
            let listeners = [];
        
            const dispatch = action => {       // At every action, dispatch is triggered in every reducer 
                state = reducers.map(reducer => reducer(state,action))[0]; 
                listeners.forEach(listener => listener()); 
            };
        
            const getState = () => console.log(state);
        
            const subscribe = listener => {
                listeners.push(listener);
                return () => {
                    listeners.filter(l => l !== listener);
                }
            }
        
            return {
                getState,
                dispatch,
                subscribe
            }
        }
    } 
}

// subscribe reducer to the store
const subscribe = [
    addPoint,
    removePoint,
    changeName]

// create store
const store = combineReducer({ points: 0, name: "" }).createStore(subscribe);

// ***Action***
store.dispatch({ type: "ADD_POINT"});
store.dispatch({ type: "ADD_POINT"});
store.dispatch({type: "REMOVE_POINT"});
store.dispatch({type: "CHANGE_NAME", name: "Pierre"});



store.getState();

