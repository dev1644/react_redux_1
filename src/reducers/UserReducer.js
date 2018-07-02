import { GET_USER_LIST_DETAILS_SUCCESS } from "../components/actions/types";

let initialState={
    fetching:false,
    data:{},
    error:{},
    
 }
 
export function reducer(state=initialState,action){
    switch(action.type){
        case GET_USER_LIST_DETAILS_SUCCESS:
        {
            console.log("inreducer",action.data)
            return {
                ...state,
                fetching:true,
                data: action.data 
            } 
            break; 
        };
        
    
    default:
        return state;
    }
    


}
