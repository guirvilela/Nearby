import { Steps } from "@/components/steps";
import { Welcome } from "@/components/welcome";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />

      <Steps />

      <TouchableOpacity style={{ backgroundColor: "red" }}>
        <Text>Continuea</Text>
      </TouchableOpacity>
    </View>
  );
}
