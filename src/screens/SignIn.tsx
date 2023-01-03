import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useAuth } from '@hooks/useAuth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppError } from "@utils/AppError";

type FormData = {  
    email: string;
    password: string;   
}

const signInSchema = yup.object({   
    email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),   
});

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const {singIn} = useAuth();
    const toast = useToast();
    
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(signInSchema),
    });

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    async function handleSignIn({ email, password}: FormData) {
        try {
            setIsLoading(true)
            await singIn(email, password);   

        } catch (error) {

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível entrar agora! Tente mais tarde!'
           
            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });           
        }         
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

                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="E-mail" 
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.email?.message}
                        />
                        )}
                    />  

                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="Senha" 
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.password?.message}
                        />
                        )}
                    />               

                    <Button 
                        title="Acessar" 
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={isLoading}
                    />
                    
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