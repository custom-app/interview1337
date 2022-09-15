import {ComponentType, createContext, PropsWithChildren, ReactNode, useCallback, useContext, useEffect} from 'react';
import {action, makeAutoObservable} from 'mobx';
import {observer} from 'mobx-react-lite';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';

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

export class DialogStore {
  open: DialogCallInstance[] = []
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  openDialog<Props extends DialogProps>(call: DialogCall<Props>, onClosed?: () => void): void {
    this.open.push({
      ...call,
      id: this.count++,
      onClosed,
    })
  }

  closeDialogById(id: number): void {
    const openIndex = this.open.findIndex(instance => instance.id === id)
    if (openIndex > 0) {
      const instance = this.open[openIndex]
      instance.onClosed?.()
      this.open.splice(openIndex, 1)
    }
  }
}

export const DialogManager = observer((): JSX.Element => {
  const {dialogStore} = useStores()
  return (
    <>
      {
        dialogStore.open.map(instance => {
          const onClose = () => {
            dialogStore.closeDialogById(instance.id)
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
})

export class ClientStore {
  list: Client[] = []

  constructor() {
    makeAutoObservable(this)
  }

  requestClients(): void {
    appFetch(
      '/api/clients',
      {clientList: {}},
    ).then(action(resp => {
      this.list = resp.clientList
    }))
  }

}


export class RootStore {
  dialogStore: DialogStore;
  clientStore: ClientStore;

  constructor() {
    this.dialogStore = new DialogStore()
    this.clientStore = new ClientStore()
  }

}

export const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

export function StoreProvider(
  {children}: PropsWithChildren<{}>
): JSX.Element {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
}

export function useStores(): RootStore {
  return useContext(StoreContext)
}

export default function App() {
  const {dialogStore} = useStores()
  const handleClick = useCallback(() => {
    dialogStore.openDialog({
      component: ClientListDialog,
      props: {
        title: 'Clients here!'
      }
    })
  }, [dialogStore])
  return (
    <StoreProvider>
      <button onClick={handleClick}>Click me!</button>
      <DialogManager/>
    </StoreProvider>
  )
}

export type ClientListDialogProps = AppDialogProps<{
  title: string
}>

const ClientListDialog = observer(({title, open, onClose}: ClientListDialogProps): JSX.Element => {
  const {clientStore} = useStores()
  useEffect(() => {
    clientStore.requestClients()
  }, [clientStore])
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
          clientStore.list.map(client => (
            <div key={client.id}>
              {/*  ...  */}
            </div>
          ))
        }
      </DialogContent>
    </Dialog>
  )
})

