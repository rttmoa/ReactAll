import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LikeButton from './components/LikeButton'
import Hello from './components/Hello'
import useURLLoader from './hooks/useURLLoader'

interface IShowResult {
  message: string;
  status: string;
}
interface IThemeProps {
  [key: string]: {color: string; background: string;}
}
const themes: IThemeProps = {
 'light': {
   color: '#000',
   background: '#eee',
 },
 'dark': {
    color: '#fff',
    background: '#222',
  }
}
export const ThemeContext = React.createContext(themes.light)

const App: React.FC = () => {
  const [ show, setShow ] = useState(false)
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* 点赞按钮 */}
          <LikeButton />

          <Hello />
          
          <p>
            <button onClick={() => {setShow(!show)}}>Refresh dog photo</button>
          </p>
          
        </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
