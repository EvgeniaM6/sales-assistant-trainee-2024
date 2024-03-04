import { useContext } from 'react';
import { OptionProps } from 'react-select';
import { SelectOptionFeeds } from '../../../models';
import { ThemeContext } from '../../../../App';

function CustomOption(props: OptionProps<SelectOptionFeeds>) {
  const { label, data, getValue, isSelected, setValue, clearValue, selectProps } = props;
  const { theme } = useContext(ThemeContext);

  const currSelectedArr = getValue() as SelectOptionFeeds[];

  const isAllOption = data.value === 'all';
  const isSelectedAll = currSelectedArr[0]?.value === 'all';

  const isAllOptionClearable = currSelectedArr.length > 0 && !isSelectedAll;
  const isChecked = isSelected || isSelectedAll;

  const handleClick = (): void => {
    if (isAllOption) {
      if (isSelected) {
        clearValue();
      } if (currSelectedArr.length) {
        clearValue();
      } else {
        setValue([data], 'select-option');
      }
    } else {
      if (isSelected) {
        const newOptionsArr = currSelectedArr.filter((option) => (
          option.value !== 'all' && option.value !== data.value
        ));
        setValue(newOptionsArr, 'select-option');
      } else if (isSelectedAll) {
        const newOptionsArr = (selectProps.options as SelectOptionFeeds[]).filter((option) => (
          option.value !== 'all' && option.value !== data.value
        ));
        setValue(newOptionsArr, 'select-option');
      } else {
        const newOptionsArr = currSelectedArr.filter((option) => option.value !== 'all');
        setValue([...newOptionsArr, data], 'select-option');
      }
    }
  };

  return (
    <>
      <div
        className={`react-select__option ${isAllOption ? 'all' : ''} ${theme}`}
      >
        <input
          className={`react-select__checkbox ${isAllOption && isAllOptionClearable ? 'clear' : ''}`}
          type='checkbox'
          name={data.value}
          id={data.value}
          checked={isChecked}
          onChange={handleClick}
        />
        <label
          htmlFor={data.value}
          className='react-select__label'
        >
          {label}
        </label>
      </div>
      {isAllOption && (
        <div className='react-select__divider-container'>
          <div className='react-select__divider'></div>
        </div>
      )}
    </>
  );
}

export default CustomOption;
