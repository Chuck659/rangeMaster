import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TargetList from './components/TargetList';
import AddTarget from './components/AddTarget';
import ShowTarget from './components/ShowTarget';
import ShowDebug from './components/ShowDebug';

const RouterComponent = props => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main">
          <Scene
            key="targetList"
            component={TargetList}
            title="Range Master V2"
            initial
            rightTitle="Add"
            onRight={() => {
              Actions.addTarget();
            }}
            leftTitle="x"
            onLeft={() => {
              Actions.showDebug();
            }}
            titleStyle={{ alignSelf: 'center' }}
          />
          <Scene
            key="addTarget"
            component={AddTarget}
            title="Add Target"
            titleStyle={{ alignSelf: 'center' }}
          />
          <Scene
            key="showTarget"
            component={ShowTarget}
            title="Target Details"
            titleStyle={{ alignSelf: 'center' }}
          />
          <Scene
            key="showDebug"
            component={ShowDebug}
            title="Debug"
            titleStyle={{ alignSelf: 'center' }}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
