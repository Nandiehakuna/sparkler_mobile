import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, TextProps } from "react-native";

import Text from "../Text";

interface Props extends TextProps {
  children: string;
  onReadMore: (value: boolean) => void;
}

const TruncatedText = ({ children, numberOfLines, onReadMore }: Props) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);

  useEffect(() => {
    // Simulating text measurement; in practice, you might need to measure text size dynamically.
    setShouldShowReadMore(children.split(" ").length > numberOfLines * 5); // Adjust logic as needed
  }, [children, numberOfLines]);

  const handleToggleText = () => {
    setIsTruncated(!isTruncated);
    onReadMore?.(!isTruncated);
  };

  return (
    <View>
      <Text
        numberOfLines={isTruncated ? undefined : numberOfLines}
        style={styles.text}
      >
        {children}
        {shouldShowReadMore && !isTruncated && (
          <TouchableOpacity onPress={handleToggleText}>
            <Text style={styles.readMore}> Read more</Text>
          </TouchableOpacity>
        )}
      </Text>
      {isTruncated && (
        <TouchableOpacity onPress={handleToggleText}>
          <Text style={styles.showLess}>Show less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "gray",
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    color: "blue",
    fontWeight: "500",
  },
  showLess: {
    fontSize: 14,
    color: "blue",
    marginTop: 4,
  },
});

export default TruncatedText;
