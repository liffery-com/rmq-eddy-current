/**
 * Object clone
 */
export default (inputObject: Record<string, any>): any => {
  return JSON.parse(
    JSON.stringify(inputObject)
  );
};
