# react-native-show-market-binance
package to  show crypto market symbols information

Installation
====
 run ```npm i react-native-show-market-binance```
- install dependencies: <br />
run ```npm install``` or ```yarn``` <br />

and import in your code: <br />
``import { ReactNativeShowMarketBinance } from "react-native-show-market-binance";``

Methods
===
- **InstantMethodForTest(enableLog?: boolean)** : rapid example test for show the symbos: "btcbrl",  "ethbrl",  "usdtbrl",  "bnbbrl",  "xrpbrl" and  "solbrl";
- **ConsultSymbol(symbol: string, enableLog?: boolean)**: select only one pair symbols to return.
- **ConsultVariousSymbols(symbols: string[], enableLog?: boolean)**: set one or more symbols in 'symbols' string[] to subscribre then and return data of all symbols.
<br/>
*tips: enable log pass true in enableLog, or disable, pass false or nothing.*
<br/>

Example of return: 
====

![image](https://user-images.githubusercontent.com/65621610/168016468-74324647-0484-4cac-979f-00bba1eb8dda.png)


For test:
====

The first step is to make sure you have the necessary requirements to run the Expo CLI on your computer:
- Node.js LTS
- npm (ou Yarn): 

---
Using NPM:
``npm install -g expo-cli``

To verify that the installation was successful, run the command below:
```expo --version```

---
With the CLI installed on your computer, you can create Expo projects (see Apenndix) and run the 'metro bundler' to serve your code, but to run the app on your mobile you need to install the **Expo Go application.** (To install it, just search the stores for the **Expo Go** app) for taking the code that `metro bundler` sends and displaying your React Native app on screen. but before, modify your App.tsx (or index.js) of example to :
````
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ReactNativeShowMarketBinance } from "react-native-show-market-binance";

export default function App() {
  const serverMessages = ReactNativeShowMarketBinance().InstantMethodForTest(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>'Preparing...'</Text>

      <ScrollView>
        {serverMessages.map((item, ind) => {
          return <Text key={ind}>{item}</Text>;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
````



----

With the app installed and the Expo project running on your computer, just connect your cell phone to the same network as your computer and read the QR Code displayed on your browser or terminal

Appendix
===
- create Expo projects:
After install expo-cli, enter a folder of your choice and open powershell / cmd here.
run ```expo init example```, select blank with typescript and after enter in example: ```cd ./example/```



