"use client";

import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  em,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useLogin } from "@/hooks/useLogin";
import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";

const Login = () => {
  const { token } = useAuthStore();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const router = useRouter();
  useDocumentTitle("LOGIN | Tournamen");

  const { login, isLoading, isError, error } = useLogin();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        !value.length ? "Username tidak boleh kosong" : null,
      password: (value) => (!value.length ? "Sandi tidak boleh kosong" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    login({ username: values.username, password: values.password });
  };

  useLayoutEffect(() => {
    if (token) {
      router.push("/team");
    }
  }, [token, router]);

  return (
    <Box>
      <Flex h="100vh" miw={"100%"} justify="center" align="center" p={24}>
        <Stack gap={48} justify="center" align="stretch" h={"60%"} w="50%">
          <Flex h={isMobile ? "80%" : "70%"}>
            <Card p={28} withBorder w="100%" radius="lg">
              <form
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ width: "100%", height: "100%" }}
              >
                <Stack
                  w="100%"
                  h="100%"
                  justify="center"
                  align="center"
                  gap={40}
                  my={48}
                >
                  <TextInput
                    label="Username"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    autoComplete="bday-day"
                    placeholder="Please enter your username"
                    error={form.errors.username}
                    key={form.key("username")}
                    {...form.getInputProps("username")}
                  />
                  <PasswordInput
                    label="Password"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    autoComplete="bday-day"
                    w="100%"
                    size="xl"
                    placeholder="Please enter your password"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                  />
                  <Button
                    variant="filled"
                    type="submit"
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fullWidth
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="subtle"
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    onClick={() => router.push("/register")}
                    fullWidth
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </Card>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Login;
