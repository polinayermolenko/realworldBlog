export const getFromLStorage = (valueName = '') => JSON.parse(localStorage.getItem(valueName));
export const removeFromLStorage = (valueName) => localStorage.removeItem(valueName);
export const setToLStorage = (valueName, data) => localStorage.setItem(valueName, JSON.stringify(data));
