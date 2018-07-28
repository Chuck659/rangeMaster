import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, LabelledText, Button } from './common';
import Debug from '../Debug';

class ShowDebug extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
  }
  componentDidMount() {
    this.logToState();
  }
  logToState() {
    this.setState({ data: Debug.getLog() });
  }
  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Button onPress={() => this.logToState()}>Refresh</Button>
          </CardSection>
          <CardSection>
            <Button
              onPress={() => {
                Debug.clear();
                this.logToState();
              }}
            >
              Clear
            </Button>
          </CardSection>
        </Card>
        <ScrollView>
          <Card>
            <CardSection>
              <Text>{this.state.data}</Text>
            </CardSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = {};
export default ShowDebug;
