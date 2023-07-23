import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MONTH_NAMES } from "../constants/Config";
import Separator from "./Separator";

type TxModalProps = {
  modalOpen: boolean;
  closeTransactionModal: () => void;
  item: any;
};

export default function TransactionModal({
  modalOpen,
  closeTransactionModal,
  item,
}: TxModalProps) {
  let isExecuted = item?.executionDate.getTime() < Date.now();
  const getDate = (date: Date) => {
    if (!date) return "";
    return `${date?.getDate()} ${MONTH_NAMES[date?.getMonth()]}`;
  };
  return (
    <Modal
      visible={modalOpen}
      animationType="fade"
      onRequestClose={closeTransactionModal}
      transparent={true}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={closeTransactionModal}
      >
        <View
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeTransactionModal}
            >
              <Text>X</Text>
            </TouchableOpacity>

            <View style={styles.modalInner}>
              <View style={styles.row}>
                <Text>Status</Text>
                <Text>Date</Text>
              </View>

              <View style={styles.row}>
                <Text style={isExecuted ? styles.done : styles.scheduled}>
                  {isExecuted ? "Complete" : "Scheduled"}
                </Text>
                <Text>{getDate(item?.executionDate)}</Text>
              </View>
              <Separator />
              <View style={styles.row}>
                <Text>From</Text>
                <Text>To</Text>
              </View>

              <View style={styles.row}>
                <Text>{item?.fromAddress}</Text>
                <Text>{item?.toAddress}</Text>
              </View>
              <Separator />
              <View style={styles.row}>
                <Text>Date posted</Text>
                <Text>Date to Execute</Text>
              </View>

              <View style={styles.row}>
                <Text>{getDate(item?.postedDate)}</Text>
                <Text>{getDate(item?.executionDate)}</Text>
              </View>
              <Separator />
              <View style={styles.row}>
                <Text>Current amount</Text>
                <Text>Target amount</Text>
              </View>

              <View style={styles.row}>
                <Text>{item?.currentValue}</Text>
                <Text>{item?.targetValue}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    width: "90%",
    borderRadius: 20,
    padding: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  modalInner: {
    alignSelf: "stretch",
    padding: 25,
  },
  done: {
    color: "green",
  },
  scheduled: {
    color: "orange",
  },
});
