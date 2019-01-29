import { combineReducers } from 'redux';
// import searchHistory from './search_history';
// import searchStatus from './search_status';
// import searchResults from './search_results';
// import searchParameters from './search_parameters';
 import playlist from './playlist';
 import playIndex from './play_index';
import playAction from './play_action';
import shouldShowPlaylist from './should_show_playlist';

import todos from './todos';
import visibilityFilter from './visibilityFilter';


export default combineReducers({
	// key: state name, value: state value
	playlist,
	playIndex,
	playAction,
	shouldShowPlaylist,
	todos,
	visibilityFilter
});
