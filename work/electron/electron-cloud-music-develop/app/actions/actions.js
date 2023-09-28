'use strict'
import { Search, Login, getPlayList, SonglistDetail, getLyric,playlistTracks } from '../server';
import lryicParser from '../libs/lrcparse';
export function play() {
  return { type: 'PLAYER', state: 'PLAYER_PLAY' };
}

export function pause() {
  return { type: 'PLAYER', state: 'PLAYER_PAUSE' };
}

export function startSearch(keywords) {
  return { type: 'SEARCH', state: 'START', payload: { keywords: keywords }}
}

export function errorSearch(e) {
  return { type: 'SEARCH', state: 'ERROR', payload: e }
}

export function finishSearch(res) {
  return { type: 'SEARCH', state: 'FINISH', payload: res }
}

export function closeSearch() {
  return { type: 'SEARCH', state: 'CLOSE' }
}

export function search(keywords) {
  return dispatch => {
    dispatch(startSearch(keywords));
    Search(keywords).then( res => {
      dispatch(finishSearch(res));
    } )
    .catch( e => {
      dispatch(errorSearch(e));
    } )
  };
} 

export function changeSong(song) {
  return { type: 'SONG', state: 'CHANGE', payload: song}
}

export function playFromList(index) {
  return { type: 'SONG', state: 'PLAYFROMLIST', payload: index}
}

export function addSong(song) {
  return { type: 'SONG', state: 'ADD', payload: song}
}

export function addSongList(songlist, isplay) {
  return { type: 'SONG', state: 'ADDLIST', payload: {
      songlist: songlist,
      play: isplay,
    }
  }
}

export function nextSong() {
  return { type: 'SONG', state: 'NEXT' }
}

export function previousSong() {
  return { type: 'SONG', state: 'PREVIOUS' }
}

export function changeRule() {
  return { type: 'SONG', state: 'CHANGERULE' }
}

export function removesongfromlist(index) {
  return {type: 'SONG', state: 'REMOVEFROMLIST', payload: index}
}

export function removesonglist() {
  return {type: 'SONG', state: 'REMOVELIST' }
}

export function showPlayList() {
  return { type: 'SONG', state: 'SHOWPLAYLIST' }
}

export function closePlayList() {
  return { type: 'SONG', state: 'CLOSEPLAYLIST' }
}

export function logging_in(form) {
  return { type: 'USER', state: 'LOGIN_STATE_LOGGING_IN', payload: form }
};

export function logged_in(res) {
  return { type: 'USER', state: 'LOGIN_STATE_LOGGED_IN', payload: res }
};

export function logged_failed(errorinfo) {
  return { type: 'USER', state: 'LOGIN_STATE_LOGGED_FAILED', payload: errorinfo }
}

export function loginform(flag) {
  return { type: 'USER', state: 'LOGINFORM', payload: flag }
}

export function toguest() {
  return { type: 'USER', state: 'GUEST' }
}

export function login(form) {
  return dispatch => {
    dispatch(logging_in(form));
    Login(form.phone, form.password)
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res));
      dispatch(logged_in(res));
      dispatch(fetchusersong(res.profile.userId));
    })
    .catch(error => {
      dispatch(logged_failed(error.toString()));
    });
  }
}

export function fetchingusersong(id) {
  return { type: 'USERSONG', state: 'FETCHING', payload: id }
}

export function getusersong(res) {
  return { type: 'USERSONG', state: 'GET', payload: res }
}

export function fetchusersongerror(err) {
  return { type: 'USERSONG', state: 'ERROR', payload: err }
}

export function fetchusersong(uid) {
  return dispatch => {
    dispatch(fetchingusersong(uid));
    getPlayList(uid)
    .then(res => {
      dispatch(getusersong(res.playlist));
    })
    .catch(err => {
      dispatch(fetchusersongerror(err));
    });
  }
}

// push content to routerstack
export  function push(content) {
  return { type: 'ROUTER', state: 'PUSH', payload: content }
}

export  function pop() {
  return { type: 'ROUTER', state: 'POP' }
}

// 获取歌单内容
export function fetchsonglistdetail(id) {
  return dispatch => {
    dispatch(fetchingsonglistdetail(id));
    SonglistDetail(id)
    .then( res => {
      dispatch(getsonglistdetail(res));
    })
    .catch(error => {
      dispatch(fetchsonglistdetailerror(error));
    });
  };
}

export function fetchingsonglistdetail(id) {
  return { type: 'SONGLIST', state: 'FETCHING', payload: id }
}

export function getsonglistdetail(res) {
  return { type: 'SONGLIST', state: 'GET', payload: res }
}

export function fetchsonglistdetailerror(err) {
  return { type: 'SONGLIST', state: 'ERROR', payload: err }
}

export function showplaycontentmini() {
  return { type: 'PLAYCONTENT', state: 'SHOWMINI' }
}

export function hiddenplaycontentmini() {
  return { type: 'PLAYCONTENT', state: 'HIDDENMINI' }
}

export function showplaycontentmax() {
  return { type: 'PLAYCONTENT', state: 'SHOWMAX' }
}

export function hiddenplaycontentmax() {
  return { type: 'PLAYCONTENT', state: 'HIDDENMAX' }
}

function fetchinglyric() {
  return { type: 'PLAYCONTENT', state: 'LRCFETCH' }
}

function getlyric(res) {
  return { type: 'PLAYCONTENT', state: 'LRCGET', payload: res }
}

function errorlyric(err) {
  return { type: 'PLAYCONTENT', state: 'LRCERROR', payload: err }
}

export function lyric(id) {
  return dispatch => {
    dispatch(fetchinglyric());
    getLyric(id).then( res => {
      dispatch(getlyric(lryicParser(res)));
    })
    .catch( err => {
      dispatch(errorlyric(err));
    });
  };
}

export function setlyric(index) {
  return { type: 'PLAYCONTENT', state: 'LRCSET', payload: index }
}

function addToast(content) {
  return { type: 'TOAST', state: 'ADD', payload: content }
}

function removeToast() {
  return { type: 'TOAST', state: 'FINISH' }
}

export function toast(content) {
  return dispatch => {
    dispatch(addToast(content));
    window.setTimeout(dispatch, 5000, removeToast());
  }
}

export function changeclientmode(mode) {
  return { type: 'PLAYCONTENT', state: 'CLIENT_MODE', payload: mode };
}
