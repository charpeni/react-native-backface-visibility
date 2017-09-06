import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class BackfaceVisibility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipAnimation: new Animated.Value(0),
      isFlipped: false,
    };

    this.flipCard = this.flipCard.bind(this);
  }

  componentWillMount() {
    const { flipAnimation } = this.state;

    // On Android, we've a flicker issue if both states have not been rendered.
    if (Platform.OS === 'android') {
      Animated.sequence([
        Animated.timing(flipAnimation, {
          toValue: 180,
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(flipAnimation, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  get frontInterpolate() {
    const { flipAnimation } = this.state;

    return flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
  }

  get backInterpolate() {
    const { flipAnimation } = this.state;

    return flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  flipCard() {
    const { flipAnimation, isFlipped } = this.state;

    let animationConfig = {
      friction: 6,
      tension: 20,
      useNativeDriver: true,
    };

    if (isFlipped) {
      animationConfig = {
        ...animationConfig,
        toValue: 0,
      };
    } else {
      animationConfig = {
        ...animationConfig,
        toValue: 180,
      };
    }

    Animated.spring(flipAnimation, animationConfig).start();

    this.setState({ isFlipped: !isFlipped });
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate },
      ],
    };

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate },
      ],
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.flipCard}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>
              Front
            </Text>
          </Animated.View>
          <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}>
            <Text style={styles.flipText}>
              Back
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
