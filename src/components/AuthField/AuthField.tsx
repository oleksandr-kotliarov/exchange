import cn from 'classnames';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  const [selected, setSelected] = useState<string[]>(['eur', 'usd', 'uah']);

  useEffect(() => {
    const currentSelected = localStorage.getItem('currencyList');

    if (currentSelected) {
      setSelected(JSON.parse(currentSelected));
    }
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
          {el}
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
