const cutString = (string, length) => {
  if (!string) return "";
  if (string.length > length) {
    return string.substring(0, length) + "...";
  }
  return string;
};

export default cutString;
