import React, { Component } from 'react';
import { 
  LayoutAnimation,
  TouchableWithoutFeedback, 
  View, 
  Text,
  Platform,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { selectLibrary } from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    if (Platform.OS === 'android') { 
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.linear();
  }
  onPress() {
    console.log(this.props.library);
    this.props.selectLibrary(this.props.library.id);
  }

  renderDescription() {
    if (this.props.expanded){
      return (
      <CardSection>
          <Text style={styles.textStyle}>
            {this.props.library.description}
          </Text>
      </CardSection>);
    }
    return <View></View>;
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress.bind(this)}>
        <View>
          <CardSection>
            <Text 
              style={styles.titleStyle}>
              {this.props.library.title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize:18,
    paddingLeft:15
  },
  textStyle: {
    flex:1,
    fontSize: 16,
    paddingLeft: 10
  }
}

const mapStateToProps = (state, props) => (
  { expanded: state.selectedLibraryId === props.library.id }
)

export default connect(mapStateToProps, { selectLibrary })(ListItem);