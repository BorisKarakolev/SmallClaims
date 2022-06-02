export const getLocalState = (stateName: string) => {
  const state = localStorage.getItem(stateName);
  if (state) {
    return { [stateName]: JSON.parse(state) };
  } else {
    return undefined;
  }
};

export const getLocalStateNumber = (stateName: string) => {
  const state = localStorage.getItem(stateName);
  if (state) {
    return parseInt(state, 10);
  }
  return undefined;
};

export const setLocalState = (stateName: any, state: any) => {
  localStorage.setItem(stateName, JSON.stringify(state));
};

// In this case there is no need localStorage to be used, because we use small fake server to store the data in a mockData.json file, playing with the file.
