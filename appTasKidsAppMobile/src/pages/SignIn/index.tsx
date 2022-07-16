import React, { useCallback, useRef, useState } from "react";

import {
	Container,
	ContainerForm,
	ContainerName,
	NameApp,
	SingUp,
	TextSingUp,
	Title,
	TitleInput
} from "./styles";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/auth";

import getValidationsErrors from "../../utils/getValidationErrors";

import { useNavigation } from "@react-navigation/native";
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	View
} from "react-native";

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const passwordInputRef = useRef<TextInput>(null);
	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();

	const handleSignIn = useCallback(async (data: SignInFormData) => {
		try {
			setIsLoading(true);
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				email: Yup.string()
					.required("E-mail obrigatório!")
					.email("Digite um e-mail válido!"),
				password: Yup.string().min(6, "No mínimo 6 dígitos"),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await signIn({
				email: data.email,
				password: data.password,
			});
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationsErrors(err);
				formRef.current?.setErrors(errors);
			}
			console.log(err);
			setIsLoading(false);
			Alert.alert(
				"Erro na autenticação",
				"Erro ao realizar o login, cheque os campos!"
			);
		}
	}, []);

	if (isLoading) {
		return (
			<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
				<ActivityIndicator size="large" color="#00ff00" />
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			enabled
		>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{ flex: 1 }}
			>
				<Container>
					<ContainerName>
						<NameApp>REALIZAR LOGIN</NameApp>
						<View>
							<Title>GoTask!</Title>
						</View>
					</ContainerName>

					<Form ref={formRef} onSubmit={handleSignIn}>
						<ContainerForm>
							<TitleInput>E-mail</TitleInput>
							<Input
								name="email"
								icon="mail"
								placeholder="Ex. GoTask@gmail.com"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={() => {
									passwordInputRef.current?.focus();
								}}
							/>

							<TitleInput>Senha</TitleInput>
							<Input
								ref={passwordInputRef}
								name="password"
								icon="lock"
								placeholder="*****"
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={() => {
									formRef.current?.submitForm();
								}}
							/>
						</ContainerForm>

						<Button
							color="#4DCD15;"
							onPress={() => {
								formRef.current?.submitForm();
							}}
						>
							Login
						</Button>
						<SingUp>
							<Text>Ou</Text>
							<TextSingUp onPress={() => navigation.navigate('Register')}>Cadastre-se aqui</TextSingUp>
						</SingUp>
					</Form>
				</Container>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
