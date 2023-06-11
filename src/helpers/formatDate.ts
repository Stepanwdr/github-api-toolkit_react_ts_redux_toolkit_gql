import moment from "moment";

const formatDate=(str:string)=>{
    const date = new Date(str);
    return moment(date.valueOf()).format('L')
}
export default formatDate
