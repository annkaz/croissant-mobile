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
import TransactionModal from "../components/TxModal";
import { MONTH_NAMES } from "../constants/Config";
import React from "react";

const DATA = [
  {
    fromAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 984,
    targetValue: 1000,
    postedDate: new Date(
      "Sun Jun 7 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
    executionDate: new Date(
      "Sun Jul 31 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
  {
    fromAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 984,
    targetValue: 1000,
    postedDate: new Date(
      "Sun Jun 25 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
    executionDate: new Date(
      "Sun Jul 29 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
  {
    fromAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 984,
    targetValue: 2500,
    postedDate: new Date(
      "Sun Jun 2 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
    executionDate: new Date(
      "Sun Jul 25 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
  },
  {
    fromAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    toAddress: truncateAddress("0x346cEf208dD81380063B8A095a8cd94DDB65826c"),
    currentValue: 3000,
    targetValue: 3000,
    postedDate: new Date(
      "Sun Jun 5 2023 01:12:24 GMT+0200 (Central European Summer Time)"
    ),
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
        <TransactionModal
          modalOpen={modalOpen}
          closeTransactionModal={closeTransactionModal}
          item={selectedItem}
        />
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
