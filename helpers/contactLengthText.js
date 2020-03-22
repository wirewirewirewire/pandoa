const contactLengthText = time => {
  const text =
    time === 0
      ? `Contact for a short time`
      : `Contact for ${Math.round(time / 1000 / 60)} min`;
  return text;
};

export default contactLengthText;
