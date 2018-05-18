import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Picker } from 'react-native';
import { Card, CardSection, LabelledText } from './common';

ShowTarget = ({ target }) => {
  return (
    <Card>
      <CardSection>
        <LabelledText label="Name" text={target.name} />
      </CardSection>

      <CardSection>
        <LabelledText label="Address" text={target.address} />
      </CardSection>
    </Card>
  );
};

const styles = {};

export default ShowTarget;
