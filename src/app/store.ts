import {TaskActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodoListActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {AppActionsType, appReducer} from './app-reducer'
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer'
import {TypedUseSelectorHook, useSelector} from "react-redux";

export type ActionType = AppActionsType & TodoListActionsType & TaskActionsType | AuthActionsType

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector // хитрая типизация селектора


export type AppDispatch = typeof store.dispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
