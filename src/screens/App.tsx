import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import { setStringAsync } from "expo-clipboard";
import { PROJECT_ID } from "@env";
import { sessionParams, providerMetadata } from "../constants/Config";
import { truncateAddress } from "../utils/HelperUtils";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/CroissantNouns.png";
import loadingLogo from "../assets/CroissantLoading.png";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function App() {
  const { isConnected, open, provider, address } = useWalletConnectModal();
  const [amount, setAmount] = useState<number | null>();
  const [showSplash, setShowSplash] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const shakeAnimationValue = useRef(new Animated.Value(0)).current;

  const onDateChange = (event: DateTimePickerEvent, newDate?: Date) => {
    const currentDate = newDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShowDatePicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const shakingAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(shakeAnimationValue, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]),
    { iterations: 5 }
  );

  useEffect(() => {
    shakingAnimation.start();

    const timer = setTimeout(() => {
      shakingAnimation.stop();
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      shakingAnimation.stop();
    };
  }, []);

  const loadingRotation = shakeAnimationValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-45deg", "45deg"],
  });

  if (showSplash) {
    return (
      <View style={styles.loadingLogo}>
        <Animated.Image
          source={loadingLogo}
          style={{
            width: 200,
            height: 200,
            transform: [{ rotate: loadingRotation }],
          }}
        />
      </View>
    );
  }

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => rotateValue.setValue(0));
  };

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  const handleSubmit = () => {
    console.log("submitting val", { amount, date });
    setAmount(null);
    setDate(new Date());
    Keyboard.dismiss;
  };

  const onCopyClipboard = async (value: string) => {
    setStringAsync(value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.connectContainer}>
            <TouchableOpacity onPress={startAnimation}>
              <Animated.Image
                source={logo}
                style={{
                  width: 50,
                  height: 50,
                  transform: [{ scale: scaleValue }, { rotate: rotation }],
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.text}>
                {isConnected ? `${truncateAddress(address)}` : "Connect Wallet"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.stakeContainer}>
            <Text style={styles.stakeTitle}>Croissant your DAI</Text>
            <Text style={styles.stakeDescription}>
              Stake DAI and receive sDAI while staking
            </Text>
            <View style={styles.card}>
              <View style={styles.datePicker}>
                <Text>Pick the date:</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newAmount) =>
                  setAmount(newAmount === "" ? undefined : Number(newAmount))
                }
                value={amount?.toString()}
                placeholder="DAI amount"
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.cardButton}
                onPress={isConnected ? handleSubmit : handleButtonPress}
              >
                <Text style={styles.text}>
                  {isConnected ? "Submit" : "Connect Wallet"}
                </Text>
              </TouchableOpacity>
              <View style={styles.stakeInfoBox}>
                <View style={styles.stakeInfo}>
                  <Text>You will recieve</Text>
                  <Text>0 sDAI</Text>
                </View>
                <View style={styles.stakeInfo}>
                  <Text>Exchange rate</Text>
                  <Text>1 sDAI = 1 DAI</Text>
                </View>
              </View>
            </View>
          </View>
          <WalletConnectModal
            projectId={PROJECT_ID}
            onCopyClipboard={onCopyClipboard}
            providerMetadata={providerMetadata}
            sessionParams={sessionParams}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loadingLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  connectContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcaf00",
    borderRadius: 15,
    width: 170,
    height: 40,
    borderWidth: 1,
    borderColor: "#fcaf00",
    marginTop: 4,
  },
  cardButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcaf00",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#fcaf00",
    marginVertical: 10,
  },
  text: {
    fontWeight: "700",
    color: "#fff",
  },
  logoText: {
    fontSize: 30,
    textAlign: "center",
  },
  stakeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stakeTitle: {
    fontWeight: "800",
    fontSize: 24,
  },
  stakeDescription: {
    fontWeight: "500",
    paddingVertical: 15,
  },
  card: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
  },
  input: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderColor: "#fcaf00",
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
  },
  stakeInfoBox: {
    paddingVertical: 10,
  },
  stakeInfo: {
    paddingVertical: 3,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
