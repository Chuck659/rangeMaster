import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Picker } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { targetFormUpdate, targetCreate, targetFormReset } from '../actions';

class AddTarget extends Component {
  onNameChange(text) {
    this.props.targetFormUpdate({ prop: 'name', value: text });
  }
  onAddressChange(text) {
    this.props.targetFormUpdate({ prop: 'address', value: text });
  }
  onButtonPress() {
    const { name, address } = this.props;
    this.props.targetCreate({ name, address, status: 'unknown', command: '' });
  }
  onClear() {
    this.props.targetFormReset();
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="target name"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Address"
            placeholder="ip address"
            onChangeText={this.onAddressChange.bind(this)}
            value={this.props.address}
          />
        </CardSection>

        <CardSection>
          <Button onPress={() => this.onButtonPress()}>Create</Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.onClear()}>Clear</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {};

const mapStateToProps = state => {
  return {
    name: state.targetForm.name,
    address: state.targetForm.address
  };
};

const actionsToMap = { targetFormUpdate, targetFormReset, targetCreate };
export default connect(
  mapStateToProps,
  actionsToMap
)(AddTarget);
