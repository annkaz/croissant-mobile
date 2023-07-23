import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { useState } from "react";
import { truncateAddress } from "../utils/HelperUtils";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DATA = [
  {
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 984,
    targetValue: 1000,
    executionDate: new Date(
      "Sun Jul 31 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
  {
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 984,
    targetValue: 1000,
    executionDate: new Date(
      "Sun Jul 29 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
  {
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 984,
    targetValue: 2500,
    executionDate: new Date(
      "Sun Jul 25 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
  {
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 3000,
    targetValue: 3000,
    executionDate: new Date(
      "Sun Jul 21 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
];

export default function TransactionScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openTransactionModal = (item: any) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeTransactionModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ paddingTop: 10 }}>
        <FlatList
          data={DATA.sort(
            (a, b) => b.executionDate.getTime() - a.executionDate.getTime()
          )}
          renderItem={({ item }) => {
            let isExecuted = item.executionDate.getTime() < Date.now();
            let date = `${item.executionDate.getDate()} ${
              MONTH_NAMES[item.executionDate.getMonth()]
            }`;
            return (
              <TouchableOpacity
                style={styles.transaction}
                key={item.toAddress}
                onPress={() => openTransactionModal(item)}
              >
                <View>
                  <View style={styles.row}>
                    <Text style={isExecuted ? styles.done : styles.scheduled}>
                      {isExecuted ? "Complete" : "Scheduled"}
                    </Text>
                    <Text>{`Target value: ${item.targetValue}`}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text>{date}</Text>
                    <Text>{`Current value: ${
                      isExecuted ? item.targetValue : item.currentValue
                    }`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffefd2",
  },
  transaction: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  done: {
    color: "green",
  },
  scheduled: {
    color: "orange",
  },
});
