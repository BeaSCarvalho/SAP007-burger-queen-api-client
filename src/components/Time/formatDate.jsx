import { format, differenceInMinutes, minutesToHours } from 'date-fns';

export const getTime = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");
  return formattedDate;
};

export const getPreparationTime = (endDateString, startDateString) => {
  const createdAt = new Date(startDateString);
  const processedAt = new Date(endDateString);
  const preparationTime = differenceInMinutes(processedAt, createdAt)
  if(preparationTime < 60){
    return `${preparationTime} min(s)`
  } else {
    return `${minutesToHours(preparationTime)} hora(s)`
  }
}