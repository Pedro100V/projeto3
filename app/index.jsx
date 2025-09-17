import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);
  const [limite, setLimite] = useState(10);
  const [inputLimite, setInputLimite] = useState('');


  useEffect(() => {
    const carregarDados = async () => {
      try {
        const valorContador = await AsyncStorage.getItem('@contador');
        const valorLimite = await AsyncStorage.getItem('@limite');

        if (valorContador !== null) setContador(JSON.parse(valorContador));
        if (valorLimite !== null) setLimite(JSON.parse(valorLimite));
      } catch (e) {
        console.log('Erro ao carregar dados', e);
      }
    };
    carregarDados();
  }, []);

  
  useEffect(() => {
    AsyncStorage.setItem('@contador', JSON.stringify(contador));
    AsyncStorage.setItem('@limite', JSON.stringify(limite));
  }, [contador, limite]);

  const incrementar = () => {
    if (contador < limite) {
      setContador(contador + 1);
    } else {
      Alert.alert('lIMITE atingido!');
    }
  };

  const decrementar = () => {
    if (contador > 0) setContador(contador - 1);
  };

  const salvarNovoLimite = () => {
    const novo = parseInt(inputLimite);
    if (!isNaN(novo) && novo > 0) {
      setLimite(novo);
      setInputLimite('');
    } else {
      Alert.alert('Erro');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Contador </Text>

      <Text style={[styles.contador]}>
        {contador}
      </Text>

      <View style={styles.botoes}>
        <Button title="+" onPress={incrementar} />
        <Button title="-" onPress={decrementar} />
      </View>

      <Text style={styles.texto}>Limite atual: {limite}</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo limite"
        value={inputLimite}
        onChangeText={setInputLimite}
        keyboardType="numeric"
      />
      <Button title="Salvar Limite" onPress={salvarNovoLimite} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9dad7ef',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contador: {
    fontSize: 80,
    fontWeight: 'bold',
    margin: 20,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  texto: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000f6',
    borderRadius: 10,
    padding: 10,
    width: 150,
    textAlign: 'center',
    marginBottom: 10,
  },
});
