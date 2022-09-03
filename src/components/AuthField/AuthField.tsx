import cn from 'classnames';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CurrencyInfo } from '../../types/CurrencyInfo';
import { getCurrencyInfo } from '../../utils/api';

import './AuthField.scss';

const allCurrencies = [
  'eur',
  'usd',
  'uah',
  'pln',
  'btc',
  'cad',
  'czk',
  'gbp',
  'jpy',
];

interface Props {
  onConfirm: (v: boolean) => void;
}

export const AuthField: FC<Props> = memo(({ onConfirm }) => {
  const [selected, setSelected] = useState<string[]>(
    JSON.parse(localStorage.getItem('currencyList') || '["eur", "usd", "uah"]'),
  );
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>({
    eur: 'Euro',
  });

  useEffect(() => {
    getCurrencyInfo()
      .then(setCurrencyInfo);
  }, []);

  const handleChoose = useCallback((el: string) => {
    if (selected.includes(el)) {
      setSelected(prev => prev.filter(currency => currency !== el));
    } else {
      setSelected(prev => [...prev, el]);
    }
  }, [selected]);

  const confirm = useCallback(() => {
    localStorage.setItem('currencyList', JSON.stringify(selected));
    onConfirm(true);
  }, [selected]);

  return (
    <div className="AuthField">
      <h2 className="AuthField__title">
        Choose Currencies
      </h2>

      {allCurrencies.map(el => (
        <button
          className={cn('AuthField__btn',
            { 'AuthField__btn--active': selected.includes(el) })}
          type="submit"
          key={el}
          onClick={() => handleChoose(el)}
        >
          <div
            className="AuthField__info"
          >
            <div className="AuthField__info--text">
              {currencyInfo[el as keyof CurrencyInfo]}
            </div>
          </div>

          {el}
          <i
            className={cn('AuthField__check',
              { 'AuthField__check--active': selected.includes(el) })}
          />
        </button>
      ))}

      <button
        className="AuthField__confirm AuthField__btn"
        type="submit"
        onClick={confirm}
      >
        Confirm
      </button>
    </div>
  );
});
