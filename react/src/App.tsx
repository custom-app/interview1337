import {Orders} from './components/Orders/Orders.tsx';
import styles from './App.module.scss'
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

function App() {

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <Orders/>
      </div>
    </LocalizationProvider>
  )
}

export default App
