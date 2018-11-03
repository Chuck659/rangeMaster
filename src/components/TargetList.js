import React, { Component } from 'react';
import { ScrollView, View, Text, AccessibilityInfo } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';
import Debug from '../Debug';

import {
  fetchTargets,
  updateStatus,
  updateDataStart,
  updateData,
  runTarget,
  resetTarget,
  clearTargetData
} from '../actions';

class TargetList extends Component {
  constructor(props) {
    super(props);
    this.showTargetText = '';
    this.timers = {};
    this.timer = null;
  }

  componentDidMount() {
    Debug.log(
      `TargetList::componentDidMount: ${JSON.stringify(this.props.targets)}`
    );
    this.props.fetchTargets();
    this.timer = setInterval(() => {
      if (this.props.targets) {
        this.props.targets.forEach(this.checkTimer.bind(this));
      }
    }, 1000);
  }

  componentWillUnmount() {
    Debug.log('TargetList::componentWillUnmount');
    clearInterval(this.timer);
  }

  onRun() {
    this.props.targets.forEach(t => {
      if (!t.disabled) {
        this.props.runTarget(t.name);
      }
    });
  }

  onReset() {
    this.props.targets.forEach(t => {
      this.props.resetTarget(t.name);
    });
  }

  onClearData() {
    this.props.targets.forEach(t => {
      this.props.clearTargetData(t.name);
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

  checkTimer(target) {
    // Debug.log(`==> ${JSON.stringify(target)}`);
    if (!target.disabled && !target.polling && !this.timers[target.name]) {
      // Debug.log(`start timer: ${target.name}`);
      this.timers[target.name] = setTimeout(() => {
        // Debug.log(`timer fired: ${target.name}`);
        this.props.updateDataStart(target.name);
        this.props.updateData(target.name);
        this.timers[target.name] = null;
      }, 500);
    }
  }

  getStatus(target) {
    if (target.disabled) {
      return 'disabled';
    } else if (target.networkError) {
      return 'network error';
    } else {
      return target.status;
    }
  }

  render() {
    // Debug.log(`targets: ${JSON.stringify(this.props.targets)}`);
    const { targets } = this.props;

    return (
      <ScrollView>
        {targets.map(t => (
          <View key={t.name}>
            <CardSection>
              <Button
                onPress={() => Actions.showTarget({ targetname: t.name })}
              >
                {t.name} - {this.getStatus(t)}
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
            <Button onPress={() => this.onClearData()}>Clear All Data</Button>
          </CardSection>
        )}
        {targets.length !== 0 ? null : (
          <CardSection>
            <Text>No Targets Defined - Press Add to add target</Text>
          </CardSection>
        )}
      </ScrollView>
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
  updateDataStart,
  runTarget,
  resetTarget,
  clearTargetData
};
export default connect(
  mapStateToProps,
  actionsToMap
)(TargetList);
