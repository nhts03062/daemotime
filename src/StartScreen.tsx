import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// Kiểu dữ liệu cho sản phẩm
interface Product {
  id: string | number;
  image: string;
  name: string;
  price: number;
}

// Kiểu cho props của ProductItem
interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productPrice}>${item.price}</Text>
  </View>
);

// Kiểu cho props của HomeScreen
interface HomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      const response = await fetch(
        "https://6758df3560576a194d120a43.mockapi.io/data"
      );
      const data = await response.json();
      setPopularProducts(data.slice(0, 7));
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Renovate</Text>
      <Text style={styles.title}>your interior</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Second")}
      >
        <Text style={styles.buttonText}>go to catalog</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Popular Products</Text>
      <View style={styles.productContainer}>
        <FlatList
          data={popularProducts}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          style={styles.productList}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  productContainer: {
    width: "100%",
    height: "40%",
    marginTop: 20,
    justifyContent: "center",
  },
  productList: {
    flexGrow: 0,
  },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: width,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
