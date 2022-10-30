import { BrowserRouter } from 'react-router-dom';
import Header from './components/app/Header';
import SetupRoute from './routes';

function App() {
  return (
    <BrowserRouter>
      <main className="font-Poppins overflow-x-hidden">
        <Header />
        <div className={`p-5 pt-20 text-text flex flex-col gap-2`}>
          <SetupRoute />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
