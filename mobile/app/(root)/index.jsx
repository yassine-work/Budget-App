import { Text, View, Image, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PageLoader from "../../components/PageLoader";
import { useTransactions } from '../../hooks/useTransactions';
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton';
import { styles } from '../../styles/home.styles';
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
    // Warning: Ensure loadData is wrapped in useCallback in your hook,
    // otherwise this might cause an infinite render loop.
  }, [loadData]);

  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) },
    ]);
  };

  if (isLoading && !refreshing) return <PageLoader />;

  // 1. Move all the static top content into this function
  const renderHeader = () => (
    <View style={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        {/* Left */}
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>
              {user?.emailAddresses[0]?.emailAddress
                .split("@")[0]
                .slice(0, 7)}
            </Text>
          </View>
        </View>
        {/* Right */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
            <Ionicons name="add" size={20} color="#FFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <SignOutButton />
        </View>
      </View>

      <BalanceCard summary={summary} />
      
      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 2. FlatList is now the main container */}
      <FlatList
        data={transactions}
        // 3. Pass the header function here
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure you have a key extractor
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.transactionsList}
        contentContainerStyle={[
            styles.transactionsListContent, 
            { flexGrow: 1 } // Ensures pull-to-refresh works even if list is empty
        ]}
      />
    </View>
  );
}