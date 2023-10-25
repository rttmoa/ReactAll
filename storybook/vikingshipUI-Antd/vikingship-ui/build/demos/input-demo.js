import React from 'react';
import Input from '../components/Input/input';
import AutoComplete from '../components/AutoComplete/autoComplete';
function InputDemo() {
    var arrayList = [
        { value: 'abc', number: 1 }, { value: 'def', number: 1 }, { value: 'ghi', number: 1 },
        { value: 'jkl', number: 1 }, { value: 'mno', number: 1 }, { value: 'pqr', number: 1 },
        { value: 'stu', number: 1 }, { value: 'vwx', number: 1 }, { value: 'yz', number: 1 }
    ];
    var handleSelect = function (item) {
        console.log(item);
    };
    var renderOption = function (item) {
        return (React.createElement("h3", null,
            item.value,
            " - ",
            item.number));
    };
    return (React.createElement("div", { style: { width: '85%', margin: '2rem auto' } },
        React.createElement(Input, { placeholder: "input", size: "sm", 
            // disabled={true}
            icon: "calculator", prepend: "https://", style: { width: '500px' } }),
        React.createElement(AutoComplete, { fetchSuggestions: function () { return arrayList; }, placeholder: "test", onSelect: handleSelect, renderOption: renderOption })));
}
export default InputDemo;
