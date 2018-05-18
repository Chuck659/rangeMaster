import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TargetList from './components/TargetList';
import AddTarget from './components/AddTarget';
import ShowTarget from './components/ShowTarget';

const RouterComponent = props => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main">
          <Scene
            key="targetList"
            component={TargetList}
            title="Shooting Range"
            initial
            rightTitle="Add"
            onRight={() => {
              Actions.addTarget();
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
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
