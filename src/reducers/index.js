import { combineReducers } from 'redux';
import TargetsReducer from './TargetsReducer';
import TargetFormReducer from './TargetFormReducer';

export default combineReducers({
  targets: TargetsReducer,
  targetForm: TargetFormReducer
});
