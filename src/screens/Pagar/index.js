import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Container,
  CustomButton,
  CustomButtonText,
  LoadingIcon,
  InputArea,
} from '../Home/styles'; // Importando estilos
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../../Api';

export default () => {
  console.log('entrou no index do Pagar...');

  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {totalValue, productList} = route.params;

  const handleFinalize = () => {
    alert('Pagamento Finalizado');
    navigation.reset({
      routes: [{name: 'Home'}],
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDoPaymentCreditType = async () => {
    try {
      setIsLoading(true);
      await baixarEstoque(productList);
      // setIsLoading(false);
      // alert('Pagamento realizado com sucesso!');
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
      // alert('Erro ao completar o pagamento');
    }
  };

  const handleDoPaymentPixType = async () => {
    try {
      setIsLoading(true);
      await baixarEstoque(productList);
      // setIsLoading(false);
      // alert('Pagamento realizado com sucesso!');
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
      // alert('Erro ao completar o pagamento');
    }
  };

  const handleDoPaymentDebitType = async () => {
    try {
      setIsLoading(true);
      await baixarEstoque(productList);
      // setIsLoading(false);
      // alert('Pagamento realizado com sucesso!');
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
      // alert('Erro ao completar o pagamento');
    }
  };

  const baixarEstoque = async productList => {
    const user = await AsyncStorage.getItem('user');
    console.log('user:');
    console.log(user);
    setIsLoading(true);
    const json = await Api.baixarEstoque(productList, user);
    console.log('json: ');
    console.log(json);
    var mensagem = json.message;
    // alert(mensagem);
    setIsLoading(false);
    //  navigation.navigate('Comprar', {totalValue: 0, productList: []});
    //  navigation.navigate('Profile', {totalValue: 0, productList: []});
    navigation.navigate('Sobre', {totalValue: 0, productList: []});
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <Container>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, marginBottom: 20}}>
          Total: R$ {totalValue.toFixed(2)}
        </Text>
        <TextInput
          style={{
            width: screenWidth * 0.8,
            height: 50,
            borderColor: '#268596',
            borderWidth: 1,
            marginBottom: 20,
            borderRadius: 10,
            paddingHorizontal: 10,
            fontSize: 18,
          }}
          placeholder="CPF para Nota Fiscal"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          maxLength={11}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
            width: screenWidth * 0.8,
          }}>
          <CustomButton
            onPress={handleDoPaymentDebitType}
            style={{flex: 1, marginHorizontal: 5}}>
            <CustomButtonText>Débito</CustomButtonText>
          </CustomButton>
          <CustomButton
            onPress={handleDoPaymentCreditType}
            style={{flex: 1, marginHorizontal: 5}}>
            <CustomButtonText>Crédito</CustomButtonText>
          </CustomButton>
          <CustomButton
            onPress={handleDoPaymentPixType}
            style={{flex: 1, marginHorizontal: 5}}>
            <CustomButtonText>Pix</CustomButtonText>
          </CustomButton>
        </View>
        <TouchableOpacity onPress={handleBack} style={{marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#268596'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <LoadingIcon size="large" color="#FFF" />
        </View>
      )}
    </Container>
  );
};
