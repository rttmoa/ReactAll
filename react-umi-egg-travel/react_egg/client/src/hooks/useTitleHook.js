import { useLayoutEffect, useState } from 'react';









export default function useTitleHook(title) {

  // console.log("使用了, useTitleHook")
  const [state, setState] = useState("");

  useLayoutEffect(() => {
    document.title = title;
    setState(title);
  }, [title]);

  return state;
}
