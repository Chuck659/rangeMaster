import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, LabelledText, Button } from './common';
import { deleteTarget, resetTarget } from '../actions';

class ShowTarget extends Component {
  onDelete() {
    this.props.deleteTarget(this.props.target.name);
    Actions.targetList();
  }

  onReset() {
    this.props.resetTarget(this.props.target.name);
  }

  render() {
    const { target } = this.props;
    return (
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
          <Button onPress={() => this.onReset()}>Reset Target</Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.onDelete()}>Delete</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {};

const actionsToMap = { deleteTarget, resetTarget };
export default connect(null, actionsToMap)(ShowTarget);
