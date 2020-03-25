import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  DeviceEventEmitter
} from "react-native";
import HTMLView from "react-native-htmlview";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function TrendingItem(props) {
  const { item } = props;
  let favoriteButton = (
    <TouchableOpacity
      style={{ padding: 6 }}
      onPress={() => {}}
      underlayColor={"transparent"}
    >
      <FontAwesome name={"star-o"} size={26} style={{ color: "red" }} />
    </TouchableOpacity>
  );
  let images = item.contributors.filter(image => {
    return image[0] !== "{";
  });
  let onSelect = function(item) {
    DeviceEventEmitter.emit("handleItem", item);
  };
  return (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <View style={styles.cell_container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <HTMLView value={item.description} stylesheet={styles.description} />
        <View style={styles.row}>
          <View style={styles.contributorWrapper}>
            <Text>Contributor:</Text>
            {images.map((itemImage, index) => {
              return (
                <Image
                  key={index}
                  style={{ height: 22, width: 22, marginLeft: 5 }}
                  source={{ uri: itemImage }}
                />
              );
            })}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Start:</Text>
            <Text>{item.starCount}</Text>
          </View>
          {favoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: "white",
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: "gray",
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  contributorWrapper: {
    flexDirection: "row"
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: "#212121"
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: "#757575"
  }
});
