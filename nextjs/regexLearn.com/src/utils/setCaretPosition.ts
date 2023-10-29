



// ? 设置 输入框内 鼠标插入的位置
const setCaretPosition = (inputEl: HTMLInputElement, pos: number): void => {
  if (!inputEl || !inputEl.setSelectionRange) return;

  inputEl.focus();
  inputEl.setSelectionRange(pos, pos);
};

export default setCaretPosition;
