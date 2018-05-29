import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, LabelledText, Button } from './common';
import { deleteTarget, resetTarget, executeFunction } from '../actions';

class ShowTarget extends Component {
  onDelete() {
    this.props.deleteTarget(this.props.target.name);
    Actions.targetList();
  }

  onReset() {
    this.props.resetTarget(this.props.target.name);
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
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function2')}>
              Function 2
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function3')}>
              Function 3
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function4')}>
              Function 4
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function5')}>
              Function 5
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function6')}>
              Function 6
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onFunction('function7')}>
              Function 7
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onReset()}>Reset Target</Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.onDelete()}>Delete</Button>
          </CardSection>

          {target.text.length == 0 ? null : (
            <View>
              <CardSection>
                <LabelledText label="Hit Data" text="" />
              </CardSection>
              {this.showData(target.text)}
            </View>
          )}
        </Card>
      </ScrollView>
    );
  }
}

const styles = {};

const actionsToMap = { deleteTarget, resetTarget, executeFunction };
export default connect(null, actionsToMap)(ShowTarget);
