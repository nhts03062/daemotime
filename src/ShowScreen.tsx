import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// Kiểu dữ liệu cho sản phẩm
interface Product {
  id: string | number;
  image: string;
  name: string;
  price: number;
  type?: string;
}

// Kiểu cho props của ShowScreen
interface ShowScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const ShowScreen: React.FC<ShowScreenProps> = ({ navigation }) => {
  const DUMMY_PRODUCTS: Product[] = [
    {
      id: 1,
      image: "https://i.imgur.com/1.jpg",
      name: "Sofa Modern",
      price: 299,
      type: "Sofas",
    },
    {
      id: 2,
      image: "https://i.imgur.com/2.jpg",
      name: "Chair Classic",
      price: 99,
      type: "Chairs",
    },
    {
      id: 3,
      image: "https://i.imgur.com/3.jpg",
      name: "Table Wood",
      price: 199,
      type: "Tables",
    },
    {
      id: 4,
      image: "https://i.imgur.com/4.jpg",
      name: "Lamp Minimal",
      price: 49,
      type: "kitchen",
    },
    {
      id: 5,
      image: "https://i.imgur.com/5.jpg",
      name: "Bookshelf",
      price: 159,
      type: "Tables",
    },
    {
      id: 6,
      image: "https://i.imgur.com/6.jpg",
      name: "Bed King Size",
      price: 499,
      type: "Sofas",
    },
    {
      id: 7,
      image: "https://i.imgur.com/7.jpg",
      name: "Desk Office",
      price: 179,
      type: "Chairs",
    },
  ];

  const [data, setData] = useState<Product[]>(DUMMY_PRODUCTS);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  const filteredData = data
    .filter((item) => (filter ? item.type === filter : true))
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const displayedData = showAll ? filteredData : filteredData.slice(0, 6);

  // Không còn loading vì không fetch nữa

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover products</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setFilter(null);
            setShowAll(false);
          }}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>Sofas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilter(null);
            setShowAll(false);
          }}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>Chairs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilter(null);
            setShowAll(false);
          }}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>Tables</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilter(null);
            setShowAll(true);
          }}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>kitchen</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Cart", { item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.priceText}>${item.price}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  item: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 14,
    color: "#888",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
