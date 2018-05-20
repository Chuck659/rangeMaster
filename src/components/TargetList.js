import React, { Component } from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';

import {
  fetchTargets,
  updateTargets,
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
    this.timer = setInterval(() => this.props.updateTargets(), 1000);
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

  render() {
    // console.log(`targets: ${this.props.targets}`);
    const { targets } = this.props;
    return (
      <Card>
        {targets.map(t => (
          <View key={t.name}>
            <CardSection>
              <Button
                delayLongPress={2500}
                onLongPress={() => Actions.showTarget({ target: t })}
                onPress={() => this.onPress(t)}
              >
                {t.name} - {t.status}
              </Button>
            </CardSection>
            {this.showTargetText !== t.name ? null : (
              <CardSection>
                <Text>{t.text}</Text>
              </CardSection>
            )}
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
      </Card>
    );
  }
}

const styles = {};

const mapStateToProps = state => {
  return {
    targets: state.targets
  };
};

const actionsToMap = {
  fetchTargets,
  updateTargets,
  runTarget,
  resetTarget
};
export default connect(mapStateToProps, actionsToMap)(TargetList);
