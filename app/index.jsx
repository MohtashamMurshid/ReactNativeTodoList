import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { data } from "../data/todos";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => a.id - b.id));
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.lenght > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  };

  const toogleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.todoItem}>
        <Text
          style={[
            styles.todoText,
            { textDecorationLine: item.completed ? "line-through" : "none " },
          ]}
        >
          {item.title}
        </Text>
        <Pressable onPress={() => toogleTodo(item.id)}>
          <MaterialCommunityIcons
            name={item.completed ? "checkbox-marked" : "checkbox-blank-outline"}
            size={24}
            color={item.completed ? "green" : "white"}
          />
        </Pressable>
        <Pressable onPress={() => removeTodo(item.id)}>
          <MaterialCommunityIcons name="trash-can" size={24} color="red" />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={text}
          onChangeText={setText}
          placeholderTextColor={"gray"}
        />

        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(todo) => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,

    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minHeight: 0,
    color: "#fff",
  },
  addButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  addButtonText: {
    color: "black",
    fontSize: 18,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    color: "#fff",
    pointerEvents: "auto",
  },
  todoText: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
  },
});
