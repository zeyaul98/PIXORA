import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name:'search',
    initialState:{
        query:'',
        activeTab:'photos',
        results:[],
        loding:false,
        error:null 
    },
    reducers:{
        setQuery(state,action){
            state.query = action.payload
        },
        setActiveTabs(state,action){
            state.activeTab = action.payload
        },
        setResults(state,action){
            state.results = action.payload,
            state.loding = false
        },
        setLoding(state){
            state.loding = true,
            state.error = null
        },
        setError(state,action){
            state.error = action.payload,
            state.loding = false
        },
        clearResults(state){
            state.results = []
        }
    }
})
export const {setQuery,setActiveTabs,setResults,setLoding,setError,clearResults} = searchSlice.actions
export default searchSlice.reducer