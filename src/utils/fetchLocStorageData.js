export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("uesr") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

   return userInfo; 
};
