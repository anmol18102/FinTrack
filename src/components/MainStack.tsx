import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";
import { TransactionsScreen } from "./screens/TransactionsScreen";
import { NewTransactionScreen } from "./screens/NewTransactionScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "My Wallet" }}
            />
            <StackNavigator.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{ title: "Transaction History" }}
            />
            <StackNavigator.Screen
                name="NewTransaction"
                component={NewTransactionScreen}
                options={{ title: "New Transaction" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);