const formatName = (surname, name) => {
  const allNames = [...surname.split(" "), ...name.split(" ")];

  const display1 = allNames.splice(0, 1).join("");

  const initials = allNames
    .map((name) => name.charAt(0).toUpperCase())
    .join(". ");

  return `${display1}, ${initials}`;
};

export default formatName;
