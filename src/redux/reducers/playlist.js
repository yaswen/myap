let list = localStorage.getItem('playlist');//读取本地存储的playlist
const initialState = (list && JSON.parse(list)) || [];//如果没有就设为空数组

const playlist = (state = initialState, action) => {
  switch (action.type) {
      case 'ADD_TO_PLAYLIST':
      let { data } = action;//从action中取出data,data的值应该是song
      const links = state.map(song => song.link);//links=state中的每一个song取出来link
      if (Array.isArray(data)) {//如果data是数组
        data = data.filter((song) => {
          return !links.includes(song.link);
        });//过滤,留下links不包含的.
        list = state.concat(data);//合并到数组中,并存到list里.待返回
      } else if (typeof data === 'object') {//如果data是对象
        if (links.includes(data.link)) {//如果data.link在links里(现在的playlist的link列表)
          list = state;//那就返回当前的列表
        } else {//其他情况,这个没太看懂.
          list = [...state, data];
        }
      }
      localStorage.setItem('playlist', JSON.stringify(list));//然后再保存playlist到本地
      return list;
    case 'NEW_PLAYLIST':
      list = action.data;
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'DELETE_SONG_IN_PLAYLIST':
      list = Array.from(state);
      list.splice(action.data, 1);
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'CLEAR_PLAYLIST':
      localStorage.setItem('playlist', '');
      return [];
    default:
      return state;
  }
};

export default playlist;
