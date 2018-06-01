import React, { Component } from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';

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
    this.timer;
    this.showTargetText = '';
  }
  componentDidMount() {
    this.props.fetchTargets();
    this.timer = setInterval(() => this.props.updateStatus(), 300);
    this.timer = setInterval(() => this.props.updateData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
    // console.log(`targets: ${this.props.targets}`);
    const { targets } = this.props;
    return (
      <Card>
        {targets.map(t => (
          <View key={t.name}>
            <CardSection>
              <Button
                style={t.networkError ? styles.btnStyleNetworkError : null}
                onPress={() => Actions.showTarget({ targetname: t.name })}
              >
                {t.name} - {t.status}
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
    backgroundColor: 'red'
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
export default connect(mapStateToProps, actionsToMap)(TargetList);
