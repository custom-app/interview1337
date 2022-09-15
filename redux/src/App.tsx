import {ComponentType, useCallback, useEffect} from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {configureStore, createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

interface AppRequest {
  clientList: {/* какие-то параметры запроса */ }
}

interface Client {
  id: number
}

interface AppResponse {
  error?: string;
  clientList: Client[]
}

export const appFetch = (
  path: string,
  request?: AppRequest,
  headers?: HeadersInit | null,
): Promise<AppResponse> => {
  return fetch(
    path,
    {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Version': '1337',
        ...headers
      },
      body: request ? JSON.stringify(request) : null,
    }
  ).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        // ненужные детали
      }
    }
  )
}

export type DialogProps = {
  open: boolean,
  onClose: () => void,
}


export type AppDialogProps<T> = T & DialogProps

export interface DialogCall<Props extends DialogProps> {
  component: ComponentType<Props>,
  props: Omit<Props, keyof DialogProps>,
}

export type DialogCallInstance = DialogCall<any> & {
  id: number
  onClosed?: () => void, // used to notify that dialog has been closed
}

export const openDialog = createAction<DialogCall<any>>('dialog/open')
export const closeDialog = createAction<{ id: number }>('dialog/close')

export interface DialogState {
  open: DialogCallInstance[],
  count: number, // all-time counter, used to make ids
}

const dialogInitialState: DialogState = {
  open: [],
  count: 0,
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: dialogInitialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(openDialog, (state, action) => {
      state.count++
      state.open.push({
        ...action.payload,
        id: state.count,
      })
    })
    .addCase(closeDialog, (state, action) => {
      const openIndex = state.open.findIndex(instance => instance.id === action.payload.id)
      if (openIndex > 0) {
        const instance = state.open[openIndex]
        instance.onClosed?.()
        state.open.splice(openIndex, 1)
      }
    })
})


export const DialogManager = (): JSX.Element => {
  const openDialogs = useAppSelector(state => state.dialog.open)
  const dispatch = useAppDispatch()
  return (
    <>
      {
        openDialogs.map(instance => {
          const onClose = () => {
            dispatch(closeDialog({id: instance.id}))
          }
          return (
            <instance.component
              {...instance.props}
              key={instance.id}
              open
              onClose={onClose}
            >
            </instance.component>
          )
        })
      }
    </>
  )
}

export interface ClientState {
  list: Client[]
}

const clientInitialState: ClientState = {
  list: []
}

const requestClients = createAsyncThunk<AppResponse, AppRequest>(
  'brands/add',
  async (arg) => {
    return appFetch(
      '/api/clients',
      arg
    )
  }
)

export const clientSlice = createSlice({
  name: 'client',
  initialState: clientInitialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(requestClients.fulfilled, (state, action) => {
      state.list = action.payload.clientList
    })
})

export interface RootState {
  dialog: DialogState,
  client: ClientState
}

export const store = configureStore({
  reducer: {
    dialog: dialogSlice.reducer,
    client: clientSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function App() {
  const dispatch = useAppDispatch()
  const handleClick = useCallback(() => {
    dispatch(
      openDialog({
        component: ClientListDialog,
        props: {
          title: 'Clients here!'
        }
      })
    )
  }, [dispatch])
  return (
    <Provider store={store}>
      <button onClick={handleClick}>Click me!</button>
      <DialogManager/>
    </Provider>
  )
}

export type ClientListDialogProps = AppDialogProps<{
  title: string
}>

const ClientListDialog = ({title, open, onClose}: ClientListDialogProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const clients = useAppSelector(state => state.client.list)
  useEffect(() => {
    dispatch(
      requestClients({
        clientList: {}
      })
    )
  }, [dispatch])
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {
          clients.map(client => (
            <div key={client.id}>
              {/*  ...  */}
            </div>
          ))
        }
      </DialogContent>
    </Dialog>
  )
}

