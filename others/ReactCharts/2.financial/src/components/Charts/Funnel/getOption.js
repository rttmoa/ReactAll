



export default function(option, data) {
  const { ...rest } = data;
  // console.log("rest", rest)
  // console.log("option", option)
  
  return {
    ...option,
    ...rest,
  };
}
