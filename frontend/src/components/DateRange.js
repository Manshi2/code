import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import Modal from './modal';

const DateRange = ({range, handleChange}) => {
    // const [modalOpen, setModalOpen] = useState(false)
    // const [range, setRange] = useState([
    //     {
    //       startDate: new Date(),
    //       endDate: addDays(new Date(), 7),
    //       key: 'selection'
    //     }
    // ]);

  return (<>
    <DateRangePicker
        onChange={item => handleChange(item)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={range}
        direction="horizontal"
    />
  </>)
}

export default DateRange