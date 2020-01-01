import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

// Định nghĩa kiểu cho item
interface Item {
  image: string;
  name: string;
  price: number;
  description: string;
}

// Định nghĩa kiểu cho props
interface DetailScreenProps {
  route: {
    params: {
      item: Item;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

export default function DetailScreen({ route, navigation }: DetailScreenProps) {
  const { item } = route.params;
  const [cart, setCart] = useState<Item[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleAddToCart = () => {
    setCart((prev) => [...prev, item]);
    setMessage("Đã thêm vào giỏ hàng!");
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>quay lai</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      {/* Chi tiết sản phẩm */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
      {/* Footer với giá và nút "Add to Cart" */}
      <View style={styles.footer}>
        <Text style={styles.productPriceFooter}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      {message ? (
        <View
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          >
            {message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  // Nút quay lại
  goBackButton: {
    padding: 10,
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
  },
  goBackText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  imageContainer: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: width - 40,
    height: "100%",
    resizeMode: "contain",
  },
  productDetails: {
    padding: 20,
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "#4CAF50",
  },
  productDescription: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    top: 100,
  },
  productPriceFooter: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
