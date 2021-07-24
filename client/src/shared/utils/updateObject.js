const updateObject = (obj, updatedObjProps) => {
  return {
    ...obj,
    ...updatedObjProps,
  };
};

export default updateObject;
