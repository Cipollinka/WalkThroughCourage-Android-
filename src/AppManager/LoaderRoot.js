import React, { useState, useEffect } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';

const fullScreenStyle = {
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center'
};

export default function LoaderRoot() {
  const frames = [
    require('./src/Slice1.jpeg'),
    require('./src/Slice2.jpeg'),
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrent(1), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={fullScreenStyle}>
      <Image source={frames[current]} style={fullScreenStyle} />
      <ActivityIndicator
        color="white"
        style={{ position: 'absolute', alignSelf: 'center', bottom: 100 }}
      />
    </View>
  );
}