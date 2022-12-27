import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormAcessCountProps = {  
    email: string;
    password: string;   
}

const signInSchema = yup.object({   
    email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),   
});

export function SignIn() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormAcessCountProps>({
        resolver: yupResolver(signInSchema),
    });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignIn({ email, password}: FormAcessCountProps) {
    console.log({ email, password })
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

        <VStack 
            flex={1} 
            px={10} pb={16}            
        >   

            <Image 
                source={BackgroundImg}
                defaultSource={BackgroundImg} //Imagem padrao
                alt="Pessoas treinando"
                resizeMode="contain"
                position="absolute"
            />

            <Center my={24}>

                <LogoSvg />

                <Text color="gray.100" fontSize="sm">
                    Treine sua mente e o seu corpo.
                </Text>

            </Center>

            <Center>
                <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                    Acesse a conta
                </Heading>

                {/* <Controller 
                    control={control}
                    email="email"
                    render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="E-mail"
                            onChangeText={onChange}
                            keyboardType="email-address"
                            autoCapitalize="none" //Deixa o teclado minusculo
                            value={value}
                            errorMessage={errors.email?.message}
                        />
                    )}
                /> */}

                <Input 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                    autoCapitalize="none" //Deixa o teclado minusculo

                />
                <Input 
                    placeholder="Senha" 
                    secureTextEntry //Deixa o password invisivel
                />

                <Button title="Acessar" onPress={handleSubmit(handleSignIn)}/>
            </Center>

            <Center mt={24}>
                <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                    Ainda não tem acesso?
                </Text>

                <Button 
                    title="Criar Conta" 
                    variant="outline"
                    onPress={handleNewAccount}
                />
            </Center>
        </VStack>

    </ScrollView>
   
    );
}