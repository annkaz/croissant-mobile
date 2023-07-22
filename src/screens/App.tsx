import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PayScreen from "./PayScreen";
import TransactionScreen from "./TransactionsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "cash";

            if (route.name === "Pay") {
              iconName = focused ? "cash" : "cash-outline";
            } else if (route.name === "Activity") {
              iconName = focused
                ? "file-tray-stacked"
                : "file-tray-stacked-outline";
            }
            // @ts-ignore
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#fcaf00",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#FFF" },
        })}
      >
        <Tab.Screen name="Pay" component={PayScreen} />
        <Tab.Screen name="Activity" component={TransactionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
