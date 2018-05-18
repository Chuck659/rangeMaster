import React, { Component } from 'react';
import { 
  LayoutAnimation,
  TouchableWithoutFeedback, 
  View, 
  Text 
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { selectLibrary } from '../actions';

const ListItem = (props) => {
  onPress = () => {
    props.selectLibrary(props.library.id);
  }

  renderDescription = () => {
    if (props.expanded){
      return (
      <CardSection>
        <Text style={{flex:1}}>
          {props.library.description}
        </Text>
      </CardSection>);
    }
    return <View></View>;
  }

    return (
      <TouchableWithoutFeedback
        onPress={onPress}>
        <View>
          <CardSection>
            <Text 
              style={styles.titleStyle}>
              {props.library.title}
            </Text>
          </CardSection>
          {renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
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