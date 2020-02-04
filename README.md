# vue-firebase_study_pjt

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## firebase deploy

```bash
$ yarn firebase:deploy
```

## firebase config file

**./firebaseConfig.js**
```javascript
export default {
    apiKey: "...",
    authDomain: "x.firebaseapp.com",
    databaseURL: "https://x.firebaseio.com",
    projectId: "x",
    storageBucket: "x.appspot.com",
    messagingSenderId: "826822149738",
    appId: "1",
    measurementId: "1"
};
```