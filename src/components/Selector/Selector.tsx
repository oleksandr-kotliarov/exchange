import cn from 'classnames';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './Selector.scss';

interface Props {
  data: string[];
  selected: string;
  onSelect: (el: string) => void;
}

export const Selector: FC<Props> = memo(({ data, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current
        && !wrapperRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openList = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelect = useCallback((el: string) => {
    if (isOpen) {
      onSelect(el);
      setIsOpen(false);
    }
  }, [isOpen]);

  return (
    <div className="Selector" ref={wrapperRef}>
      <button
        type="submit"
        className="Selector__button"
        onClick={openList}
      >
        <h1 className="Selector__selected">
          {selected}
        </h1>
        <img
          src="dropdown.svg"
          alt="dropdown"
          className="Selector__dropdown"
          style={{
            transform: `translateY(-50%) rotate(${isOpen ? '180deg' : 0})`,
          }}
        />
      </button>

      <div className={cn('list', { 'list--active': isOpen })}>
        {data.map((el, i) => (
          <button
            type="submit"
            className="Selector__element"
            key={el}
            style={{
              transform: `translateY(${72 * i}px`,
              backgroundColor: i % 2 === 0 ? '#2E2E2E' : '#353535',
            }}
            onClick={() => handleSelect(el)}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
});
