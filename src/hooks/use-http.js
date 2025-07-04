import { useCallback, useReducer } from "react";

function httpReducer(state, action){
    if(action.type === 'SEND'){
        return{
            status : 'pending',
            data : null,
            error : null
        }
    }

    if(action.type === 'SUCCESS'){
        return{
            data : action.responseData,
            error : null,
            status : 'completed'
        }
    }

    if(action.type === 'ERROR'){
        return {
            data : null,
            error : action.errorMessage,
            status : 'completed' 
        }
    }

    return state
}

function useHttp(requestFunction, startWithPending = false){
    const[httpState, dispatch] = useReducer(httpReducer, {
        status : startWithPending ? 'pending' : null,
        data : null,
        error : null
    })

    const sendRequest = useCallback(
        async function(requestData){
            dispatch({type : 'SEND'})
            try{
                const responseData = await requestFunction(requestData);
                dispatch({type : 'SUCCESS', responseData})
            }catch(error){
                dispatch({
                    type : 'ERROR',
                    errorMessage : error.message || 'Something wrong happened!'
                })
            }
        },
        [requestFunction]
    )
    return {
        sendRequest,
        ...httpState
    }
}
export default useHttp