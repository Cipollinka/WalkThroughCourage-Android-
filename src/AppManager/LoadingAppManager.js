import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

const wrapStyle = {
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
};

const bgStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

export default function LoadingAppManager() {
  return (
    <View style={wrapStyle}>
      <Image source={require('./src/Slice2.jpeg')} style={bgStyle} />
      <ActivityIndicator
        color="white"
        style={{ position: 'absolute', alignSelf: 'center', bottom: 100 }}
      />
    </View>
  );
}