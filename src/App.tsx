import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import './App.scss';
import { AuthField } from './components/AuthField';
import { Exchanger } from './components/Exchanger';

const App: FC = memo(() => {
  const [isAuthorised, setIsAuthorised] = useState(false);

  useEffect(() => {
    setIsAuthorised(
      localStorage.getItem('currencyList') !== null,
    );
  }, []);

  const goToChoose = useCallback(() => {
    setIsAuthorised(false);
  }, []);

  return (
    <div className="App">
      <h1 className="App__title">
        Exchange
      </h1>

      <div className="App__content">
        {isAuthorised
          ? <Exchanger />
          : <AuthField onConfirm={setIsAuthorised} />}

      </div>

      {isAuthorised && (
        <button
          className="App__btn"
          type="submit"
          onClick={goToChoose}
        >
          Change currencies
        </button>
      )}
    </div>
  );
});

export default App;
