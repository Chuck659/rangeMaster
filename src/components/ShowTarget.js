import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, CheckBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, LabelledText, Button } from './common';
import Debug from '../Debug';
import {
  deleteTarget,
  runTarget,
  resetTarget,
  clearTargetData,
  executeFunction,
  toggleDisabled,
  toggleDebug,
  updateData,
  updateDataStart
} from '../actions';

class ShowTarget extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = { timer: null };
  }

  startDataTimer() {
    if (!this.state.timer) {
      timer = setTimeout(() => {
        Debug.log('ShowTarget::Timeoout get data');
        this.props.updateDataStart(this.props.target.name);
        this.props.updateData(this.props.target.name);
        this.setState({ timer: null });
      }, 10000);
      this.setState({ timer });
    }
  }

  onDelete() {
    this.props.deleteTarget(this.props.target.name);
    Actions.pop();
  }

  onRun() {
    this.props.runTarget(this.props.target.name);
    this.startDataTimer();
  }

  onReset() {
    this.props.resetTarget(this.props.target.name);
  }

  onClearData() {
    this.props.clearTargetData(this.props.target.name);
  }

  onRefreshData() {
    this.props.updateDataStart(this.props.target.name);
    this.props.updateData(this.props.target.name);
  }

  onFunction(func) {
    Debug.log(`Execute function: ${func}`);
    this.props.executeFunction(this.props.target.name, func);
    this.startDataTimer();
  }

  onToggleDisabled() {
    this.props.toggleDisabled(this.props.target.name);
  }

  onToggleDebug() {
    this.props.toggleDebug(this.props.target.name);
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
    const { target } = this.props;
    const { timer } = this.state;
    if (!target) return <View />;
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <LabelledText label="Name" text={target.name} />
          </CardSection>

          <CardSection>
            <LabelledText label="Address" text={target.address} />
          </CardSection>

          <CardSection>
            <LabelledText label="Status" text={this.getStatus(target)} />
          </CardSection>

          <CardSection>
            <Button
              onPress={() => this.onFunction('function1')}
              disabled={!!timer}
            >
              Function 1
            </Button>
            <Button
              onPress={() => this.onFunction('function2')}
              disabled={!!timer}
            >
              Function 2
            </Button>
          </CardSection>

          <CardSection>
            <Button
              onPress={() => this.onFunction('function3')}
              disabled={!!timer}
            >
              Function 3
            </Button>
            <Button
              onPress={() => this.onFunction('function4')}
              disabled={!!timer}
            >
              Function 4
            </Button>
          </CardSection>

          <CardSection>
            <Button
              onPress={() => this.onFunction('function5')}
              disabled={!!timer}
            >
              Function 5
            </Button>
            <Button
              onPress={() => this.onFunction('function6')}
              disabled={!!timer}
            >
              Function 6
            </Button>
          </CardSection>

          <CardSection>
            <Button
              onPress={() => this.onFunction('function7')}
              disabled={!!timer}
            >
              Function 7
            </Button>
            <Button onPress={() => this.onRun()} disabled={!!timer}>
              Run
            </Button>
          </CardSection>

          <View>
            <CardSection>
              <LabelledText label="Hit Data" text="" />
            </CardSection>
            {this.showData(target.text)}
          </View>

          <CardSection>
            <Button onPress={() => this.onClearData()}>Clear Data</Button>
            <Button onPress={() => this.onRefreshData()}>Refresh Data</Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onToggleDisabled()}>
              {target.disabled ? 'Enable' : 'Disable'}
            </Button>
            <Button onPress={() => this.onToggleDebug()}>
              {target.debug ? 'Debug Off' : 'Debug On'}
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onDelete()}>Delete</Button>
          </CardSection>
          <CardSection />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  return {
    target: state.targets.filter(t => t.name == ownprops.targetname)[0]
  };
};

const styles = {};

const actionsToMap = {
  deleteTarget,
  runTarget,
  resetTarget,
  clearTargetData,
  executeFunction,
  toggleDisabled,
  toggleDebug,
  updateData,
  updateDataStart
};
export default connect(
  mapStateToProps,
  actionsToMap
)(ShowTarget);
