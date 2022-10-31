module.exports = () => {
  let date_ob = new Date();
  let day = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = ("0" + date_ob.getHours()).slice(-2);
  let minutes = ("0" + date_ob.getMinutes()).slice(-2);
  let seconds = ("0" + date_ob.getSeconds()).slice(-2);
  let milliseconds = ("0" + date_ob.getMilliseconds()).slice(-2);
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}:${milliseconds}`;
};
