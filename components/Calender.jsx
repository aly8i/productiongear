import { DateRangePicker } from 'rsuite';
import { CustomProvider } from 'rsuite/esm';
import format from 'date-fns/format';
export default function BasicDateRangePicker({setDate1,setDate2,setDuration}) {
    const handleDate = (val) =>{
        setDate1(format(val[0], 'yyyy/MM/dd'));
        setDate2(format(val[1], 'yyyy/MM/dd'));
        setDuration((val[1]-val[0])/86400000);
    }
    const handleClean = () =>{
        setDate1(null);
        setDate2(null);
        setDuration(null);
    }
    return(
    <CustomProvider theme="dark">
        <DateRangePicker placeholder="Select Date" placement="topStart" onClean={()=>handleClean()} onOk={value => handleDate(value)} color="grey" />
    </CustomProvider>
    )
}