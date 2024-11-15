export default function parseMobileNumber(value: { toString: () => any }) {
  const numString = value.toString();
  const newNumString = numString.substring(2);
  return parseInt(newNumString);
}
