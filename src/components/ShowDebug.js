import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, LabelledText, Button } from './common';
import Debug from '../Debug';

class ShowDebug extends Component {
  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <Text>{Debug.getLog()}</Text>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {};
export default ShowDebug;
