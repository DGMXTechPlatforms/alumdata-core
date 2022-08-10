import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { useState } from 'react';
import SmartInput from './SmartInput';
import calendario from '../../css/img/calendario.svg';

const DateRangeInput = ({ onSelect, value, name, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDatePicker = () => {
    setIsOpen(true);
  };

  const closeDatePicker = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SmartInput
        title={title}
        name={name}
        imageSrc={calendario}
        placeholder=""
        value={
          value !== undefined
            ? `${value.start.format('YYYY-MM-DD')} - ${value.end.format(
                'YYYY-MM-DD'
              )}`
            : ''
        }
        isValid={true}
        onFocus={openDatePicker}
      />
      {isOpen && (
        <DateRangePicker
          value={value}
          onSelect={(value, state) => {
            closeDatePicker();
            onSelect(value);
          }}
          singleDateRange={true}
          selectedLabel={true}
        />
      )}
    </div>
  );
};

export default DateRangeInput;
