import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import './App.scss';
import { Selector } from './Selector';
import { getCurrency } from './api';

const regExp = /(^[1-9])\d*\.{0,1}\d*/;

const data = [
  'eur',
  'usd',
  'uah',
  'pln',
];

function App() {
  const [selectedFirst, setSelectedFirst] = useState('eur');
  const [selectedSecond, setSelectedSecond] = useState('usd');
  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    getCurrency(selectedFirst)
      .then(setCurrency);
  }, [selectedFirst]);

  const changeFirstSel = useCallback((el: string) => {
    setSelectedFirst(el);
    setFirstVal('');
    setSecondVal('');
  }, []);

  const changeSecondSel = useCallback((el: string) => {
    setSelectedSecond(el);
    setFirstVal('');
    setSecondVal('');
  }, []);

  const handleChangeFirst = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === '') {
      setFirstVal('');
      setSecondVal('');
    }

    if (value.match(regExp) && value.split('.').length <= 2) {
      setFirstVal(value);

      if (currency) {
        const current = currency[selectedFirst][selectedSecond];
        const newRes = Math.round(current * +value * 100) / 100;

        setSecondVal(String(newRes));
      }
    }
  }, [currency, selectedFirst, selectedSecond]);

  const handleChangeSecond = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === '') {
      setFirstVal('');
      setSecondVal('');
    }

    if (regExp.test(value) && value.split('.').length <= 2) {
      setSecondVal(value);

      if (currency) {
        const current = currency[selectedFirst][selectedSecond];
        const newRes = Math.round((+value / current) * 100) / 100;

        setFirstVal(String(newRes));
      }
    }
  }, [currency, selectedFirst, selectedSecond]);

  return (
    <div className="App">
      <div className="App__title--field">
        <h1 className="App__title">
          Exchange
        </h1>
      </div>

      <div className="App__field">
        <div className="App__input-field">
          <input
            type="text"
            className="App__input"
            placeholder="0"
            value={firstVal}
            onChange={handleChangeFirst}
          />
          <Selector
            data={data.filter(el => el !== selectedFirst)}
            selected={selectedFirst}
            onSelect={changeFirstSel}
          />
        </div>
        <img src="arrows.svg" alt="arrow" className="App__arrows" />
        <div className="App__input-field">
          <input
            type="text"
            className="App__input"
            placeholder="0"
            value={secondVal}
            onChange={handleChangeSecond}
          />
          <Selector
            data={data.filter(el => el !== selectedSecond)}
            selected={selectedSecond}
            onSelect={changeSecondSel}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
