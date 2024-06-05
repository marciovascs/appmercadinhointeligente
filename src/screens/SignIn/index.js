import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../contexts/UserContext';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

// importar o arquivo de api
import Api from '../../Api';

// importar nosso componente input
import SignInput from '../../components/SignInput';

//importar os svg
import ImgLogin from '../../assets/imgLogin.svg';
import ImgEmail from '../../assets/imgEmail.svg';
import ImgCadeadoPreto from '../../assets/imgCadeadoPreto.svg';

export default () => {

  console.log('entrou no index do SignIn...');

  // criar o dispatch para poder mandar informações para o context
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();
  // criar os states de email e senha
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  // ir pra tela de cadastro
  const handleMessageButtonClick = () => {
    // quando clicar vai pra tela de cadastro - sem a possibilidade dele voltar - reset
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  useEffect(() => {
    console.log('Entrou no useEffect do signIn...');
    console.log('Vamos verificar se tem o objeto user salvo no celular...');
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        // encontrou o token no celular
        console.log('User existe');
      } else {
        console.log('User não existe');
      }
    };
    checkUser();
  }, []);

  // quando clicar no botão de login
  const handleSignClick = async () => {
    console.log('entrou no signin...');
    
    // navigation.reset({
    //   routes: [{name: 'MainTab'}],
    // });

    // verificar se digitou email e senha
    if (emailField !== '' && passwordField !== '') {
      console.log('vai chamar a api...');
      // usar api para fazer o login
      let json = await Api.signIn(emailField, passwordField);
      console.log('json: ');
      console.log(json);

      if (json.user) {
        json.user.password = passwordField;
        /**
         * salvar os dados do usuário logado no async storage
         * salvar email e password, para quando ele voltar fazermos o login automático
         */
        await AsyncStorage.setItem('user', JSON.stringify(json.user));
        console.log('Usuário salvo no celular!');
        console.log(json.user);
      }
      if (json.token) {
        console.log('Token recebido no index do signin!');
        console.log(json.token);
        // aqui recebeu o token
        // eslint-disable-next-line no-alert
        // alert('Usuário autenticado com sucesso!');

        // salvar o token no async storage - fechar o app e abrir de novo, estará lá
        await AsyncStorage.setItem('token', json.token);
        console.log('Token salvo no celular!');

        // console.log('Vai salvar o usuário na seção...');
        // salvar outras informações no context (na seção)
        // o setUser precisar estar criado no UserReducer
        userDispatch({
          type: 'setUser', // nome da ação
          payload: {
            user: json.user, //enviar o user pra ser salvo
          },
        });
        console.log('Usuário salvo na seção!');

        // mandar o usuário pro home - tab principal - reset para ele não poder voltar para o login, uma vez que ele já logou.
        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        // eslint-disable-next-line no-alert
        alert('Email ou senha não conferem');
      }
    } else {
      // email ou senha não foram digitados
      // eslint-disable-next-line no-alert
      alert('Dados inválidos!');

      // navigation.reset({
      //   routes: [{name: 'MainTab'}],
      // });
    }
  };
  return (
    <Container>
      <ImgLogin width="100%" height="160" />
      <InputArea>
        {/* Chamar nossos componentes passando o ícone que é pra mostrar */}
        <SignInput
          IconSvg={ImgEmail}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={t => setEmailField(t)} // possibilitar alterar o valor do campo
        />
        <SignInput
          IconSvg={ImgCadeadoPreto}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t => setPasswordField(t)} // possibilitar alterar o valor do campo
          password={true}
        />
        {/* Botão de login */}
        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>
      {/* <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ainda não possui conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton> */}
    </Container>
  );
};
