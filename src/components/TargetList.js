import React, { Component } from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';

import { fetchTargets, updateTargetsStatus } from '../actions';

class TargetList extends Component {
  constructor(props) {
    super(props);
    this.timer;
  }
  componentDidMount() {
    this.props.fetchTargets();
    this.timer = setInterval(() => this.props.updateTargetsStatus(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    console.log(`targets: ${this.props.targets}`);
    return (
      <Card>
        {this.props.targets.map(t => (
          <CardSection key={t.name}>
            <Button onPress={() => Actions.showTarget({ target: t })}>
              {t.name} - {t.status}
            </Button>
          </CardSection>
        ))}
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

const actionsToMap = { fetchTargets, updateTargetsStatus };
export default connect(mapStateToProps, actionsToMap)(TargetList);
