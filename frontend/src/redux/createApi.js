

import { getDefaultMiddleware, isAsyncThunkAction } from '@reduxjs/toolkit';
import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

function simulateLoading  () {
    return new Promise ((resolve) => setTimeout(resolve,500))
}

const api = createApi({
    baseQuery: () =>{},
    endpoints: build => ({
        pokemonList :build.query({
            async queryFn(){
                const result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
                if(result.ok){
                    const data = await result.json();
                    return { data };
                }else{
                    return {error : "something went wrong"};
                }
            }
        }),
        pokemonDetail :build.query({
            async queryFn(){
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
                if(result.ok){
                    const data = await result.json();
                    return { data };
                }else{
                    return {error : "something went wrong"};
                }
            }
        }),
    })
})

const {usePokemonListQuery,usePokemonDetailQuery} = api ;

//how to use
const {data,isLoading,isError,isSuccess} = usePokemonListQuery();

if(isLoading){
    return "loading...";
}

if(isError){
    return "something wnet wrong";
}

if(isSuccess){
    return (
        <div>

        </div>
    )
}


//3. pass query Arguments to RTK Query Hooks

const {data,isLoading,isError,isSuccess} = usePokemonDetailQuery({
    name:pokemonName
});


//4. Refactor RTK Query EndPoints to use baseQuery to Remove code Duplication
// In the above createApi Object you can see we have duplicate code while calling api lets reduce isAsyncThunkAction


const api2 = createApi({
    baseQuery: async(url) =>{

        const result = await fetch(url)
                if(result.ok){
                    const data = await result.json();
                    return { data };
                }else{
                    return {error : "something went wrong"};
                }

    },
    endpoints: build => ({
        pokemonList :build.query({
           query(){
            return 'https://pokeapi.co/api/v2/pokemon?limit=9';
           }
        }),
        pokemonDetail :build.query({
            query(name){
                return `https://pokeapi.co/api/v2/pokemon/${name}`;
               }
        }),
    })
})

//Refactor baseQuery to use RTK Query fetchBaseQuery


const api3 = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl : `https://pokeapi.co/api/v2/`
    }),
    endpoints: build => ({
        pokemonList :build.query({
           query(){
            return {
                url : "pokemon",
                params:{
                    limit:9,
                },
                method: 'GET',
                // headers : { ''}
            }
           }
        }),
        pokemonDetail :build.query({
            query : ({name}) => `pokemon/${name}/`
        }),
    })
})

//7.  convert a RTK Query Application to TypeScript

//8. Explore Redux Devtools to Understand Your RTK Query App Data Fetching Behavior

//

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer : {
        [api.reducerPath]:api.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

<React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
</React.StrictMode/>