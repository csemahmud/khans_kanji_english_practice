import './App.css'
import KanjiTestController from './features/controllers/KanjiTestController'
import { Helmet } from 'react-helmet-async'
import { QUIZ_TITLE } from './models/constants/uiText'

function App() {
  return (
    <>
      <Helmet>
        <title>{QUIZ_TITLE}</title>
      </Helmet>
      
      <main>
        <KanjiTestController />
      </main>
    </>
  )
}

export default App
