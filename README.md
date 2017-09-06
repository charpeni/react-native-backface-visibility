# React Native Backface Visibility

This repository was used to test compatibility of the `backfaceVisibility` property on iOS and Android using `react-native@0.48.1`.

## iOS
<img src="https://user-images.githubusercontent.com/7189823/30123343-a845891c-92ff-11e7-977b-1f6e60a9eb8e.gif" width="300" />

## Android
<img src="https://user-images.githubusercontent.com/7189823/30123717-e5361598-9300-11e7-8e2e-a87a7a8d896a.gif" width="300" />

### Flicker issue
On Android, we've a flicker issue if both states have not been rendered.

<details>
  <img src="https://user-images.githubusercontent.com/7189823/30123936-9c54b6ee-9301-11e7-8ba3-20f80b1c19f4.gif" width="300" />
</details>

Can be fixed with the following animation:

```javascript
componentWillMount() {
  const { flipAnimation } = this.state;

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
```