import React, { Component } from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';
import Debug from '../Debug';

import {
  fetchTargets,
  updateStatus,
  updateData,
  runTarget,
  resetTarget
} from '../actions';

class TargetList extends Component {
  constructor(props) {
    super(props);
    this.showTargetText = '';
  }
  componentDidMount() {
    Debug.log('TargetList::componentDidMount');
    this.props.fetchTargets();
    this.timer1 = setInterval(() => {
      this.props.updateStatus();
    }, 2000);
    this.timer2 = setInterval(() => {
      this.props.updateData();
    }, 1000);
  }

  componentWillUnmount() {
    Debug.log('TargetList::componentWillUnmount');
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }

  onRun() {
    this.props.targets.forEach(t => {
      this.props.runTarget(t.name);
    });
  }

  onReset() {
    this.props.targets.forEach(t => {
      this.props.resetTarget(t.name);
    });
  }

  onPress(target) {
    if (this.showTargetText == target.name) {
      this.showTargetText = '';
    } else {
      this.showTargetText = target.name;
    }
  }

  showData(data) {
    if (!data) return null;
    return (
      <View>
        {data.map((item, ndx) => (
          <CardSection key={ndx}>
            <Text>{item}</Text>
          </CardSection>
        ))}
      </View>
    );
  }

  render() {
    Debug.log(`targets: ${JSON.stringify(this.props.targets)}`);
    const { targets } = this.props;
    return (
      <Card>
        {targets.map(t => (
          <View key={t.name}>
            <CardSection>
              <Button
                onPress={() => Actions.showTarget({ targetname: t.name })}
              >
                {t.name} - {t.networkError ? 'network error' : t.status}
              </Button>
            </CardSection>
            {this.showData(t.text)}
          </View>
        ))}
        {targets.length === 0 ? null : (
          <CardSection>
            <Button onPress={() => this.onRun()}>Run</Button>
          </CardSection>
        )}
        {targets.length === 0 ? null : (
          <CardSection>
            <Button onPress={() => this.onReset()}>Reset All</Button>
          </CardSection>
        )}
        {targets.length !== 0 ? null : (
          <CardSection>
            <Text>No Targets Defined - Press Add to add target</Text>
          </CardSection>
        )}
      </Card>
    );
  }
}

const styles = {
  btnStyleNetworkError: {
    color: 'red'
  }
};

const mapStateToProps = state => {
  return {
    targets: state.targets
  };
};

const actionsToMap = {
  fetchTargets,
  updateStatus,
  updateData,
  runTarget,
  resetTarget
};
export default connect(
  mapStateToProps,
  actionsToMap
)(TargetList);
