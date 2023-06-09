export default function dateToDay(date){
  const weekDays = ['Sunday','Monday','Tuesday', 'Wednesday','Thursday', 'Friday','Saturday']
  const dateStr = new Date(date);
  const dayNum = dateStr.getDay()
  return weekDays[dayNum]
}
