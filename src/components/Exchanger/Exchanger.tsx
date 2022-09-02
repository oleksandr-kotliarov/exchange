import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import './Exchanger.scss';

import { Selector } from '../Selector';
import { getCurrency } from '../../utils/api';
import { checkValidInput } from '../../utils/checkValidInput';
import { InputNum } from '../../types/InputNum';

export const Exchanger: FC = memo(() => {
  const [data, setData] = useState<string[]>(['eur', 'usd', 'uah']);
  const [selectedFirst, setSelectedFirst] = useState('eur');
  const [selectedSecond, setSelectedSecond] = useState('usd');
  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    const currencyList = JSON.parse(
      localStorage.getItem('currencyList') || '[]',
    );

    setData(currencyList);
  }, []);

  useEffect(() => {
    getCurrency(selectedFirst)
      .then(setCurrency);
  }, [selectedFirst]);

  const clearInputs = useCallback(() => {
    setFirstVal('');
    setSecondVal('');
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, inputNum: InputNum) => {
      const { value } = e.target;

      if (value === '') {
        clearInputs();
      }

      if (checkValidInput(value)) {
        switch (inputNum) {
          case InputNum.first:
            setFirstVal(value);
            break;

          case InputNum.second:
            setSecondVal(value);
            break;

          default:
            break;
        }
      }

      if (currency) {
        const current = currency[selectedFirst][selectedSecond];

        if (inputNum === InputNum.first) {
          const newRes = Math.round(current * +value * 100) / 100;

          setSecondVal(String(newRes));
        }

        if (inputNum === InputNum.second) {
          const newRes = Math.round((+value / current) * 100) / 100;

          setFirstVal(String(newRes));
        }
      }
    },
    [currency, selectedFirst, selectedSecond],
  );

  return (
    <div className="Exchanger">
      <div className="Exchanger__input-field">
        <input
          type="text"
          className="Exchanger__input"
          placeholder="0"
          value={firstVal}
          onChange={(event) => handleChange(event, InputNum.first)}
        />
        <Selector
          data={data.filter(el => el !== selectedFirst)}
          selected={selectedFirst}
          onSelect={(el: string) => {
            setSelectedFirst(el);
            clearInputs();
          }}
        />
      </div>
      <img src="arrows.svg" alt="arrow" className="Exchanger__arrows" />
      <div className="Exchanger__input-field">
        <input
          type="text"
          className="Exchanger__input"
          placeholder="0"
          value={secondVal}
          onChange={(event) => handleChange(event, InputNum.second)}
        />
        <Selector
          data={data.filter(el => el !== selectedSecond)}
          selected={selectedSecond}
          onSelect={(el: string) => {
            setSelectedSecond(el);
            clearInputs();
          }}
        />
      </div>
    </div>
  );
});
