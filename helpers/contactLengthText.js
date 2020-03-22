const contactLengthText = (time, kind) => {
  let text =
    time === 0
      ? `Contact for a short time`
      : `Contact for ${Math.round(time / 1000 / 60)} min`;
  if (kind === "short")
    text = time === 0 ? `short contact` : `${Math.round(time / 1000 / 60)} min`;
  return text;
};

export default contactLengthText;
