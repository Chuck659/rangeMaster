import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, LabelledText, Button } from './common';
import {
  deleteTarget,
  runTarget,
  resetTarget,
  clearTargetData,
  executeFunction
} from '../actions';

class ShowTarget extends Component {
  onDelete() {
    this.props.deleteTarget(this.props.target.name);
    Actions.pop();
  }

  onRun() {
    this.props.runTarget(this.props.target.name);
  }

  onReset() {
    this.props.resetTarget(this.props.target.name);
  }

  onClearData() {
    this.props.clearTargetData(this.props.target.name);
  }

  onFunction(func) {
    this.props.executeFunction(this.props.target.name, func);
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
    const { target } = this.props;
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
            <LabelledText label="Status" text={target.status} />
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function1')}>
              Function 1
            </Button>
            <Button onPress={() => this.onFunction('function2')}>
              Function 2
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function3')}>
              Function 3
            </Button>
            <Button onPress={() => this.onFunction('function4')}>
              Function 4
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function5')}>
              Function 5
            </Button>
            <Button onPress={() => this.onFunction('function6')}>
              Function 6
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function7')}>
              Function 7
            </Button>
            <Button onPress={() => this.onRun()}>Run</Button>
          </CardSection>

          <View>
            <CardSection>
              <LabelledText label="Hit Data" text="" />
            </CardSection>
            {this.showData(target.text)}
          </View>

          <CardSection>
            <Button onPress={() => this.onClearData()}>Clear Data</Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onDelete()}>Delete</Button>
          </CardSection>
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
  executeFunction
};
export default connect(
  mapStateToProps,
  actionsToMap
)(ShowTarget);
