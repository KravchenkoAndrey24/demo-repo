export const getWindDirection = (degrees = 0) => {
  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.round((degrees % 360) / 45);
  return directions[index % 8];
};

export const getFriendlyNewDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};

export const generateRandomId = () => {
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
};
