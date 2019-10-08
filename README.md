# Ignite Airship Boilerplate

Based on the [Bowser Ignite boilerplate](https://github.com/infinitered/ignite-bowser).

```
npx ignite new AppName -b @airship/ignite-airship-boilerplate
```

## Generators
```
ignite g component NewComponent
ignite g screen NewScreen
```

## TODO
- Add Cocoapods check before install
- Remove tvOS target & test targets
- Add CodePush keys for staging & release
- Add CodePush HoC to root component, or give instructions on how
- `add_bundle_id_suffixes` not working
  - should add `.staging` suffix to bundle id for staging & change display name
- Get Apple team ID and setup Team for target
- add pre-build script for env variables in App Center
- Add in react-native-splash-screen with example loading screen
