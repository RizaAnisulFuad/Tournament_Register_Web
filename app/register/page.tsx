"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  PasswordInput,
  Stack,
  TextInput,
  em,
} from "@mantine/core";

import { useRegister } from "@/hooks/useLogin";
import { useForm } from "@mantine/form";
import { useAuthStore } from "@/store/auth";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const RegisterUser = () => {
  const { token } = useAuthStore();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const router = useRouter();
  useDocumentTitle("Register | Tournamen");

  const { register, isLoading, isError, error } = useRegister();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (value) => (!value.length ? "Username cannot be empty" : null),
      name: (value) => (!value.length ? "Name cannot be empty" : null),
      email: (value) => {
        if (!value.length) {
          return "Email cannot be empty";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return "Invalid email address";
        }
        return null;
      },
      password: (value) => (!value.length ? "Password cannot be empty" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    register({
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.name,
      email: values.email,
    });
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
          <Flex>
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
                    label="Name"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    autoComplete="bday-day"
                    placeholder="Please enter your name"
                    error={form.errors.name}
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    label="Email"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    autoComplete="bday-day"
                    placeholder="Please enter your email"
                    error={form.errors.email}
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
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

                  <PasswordInput
                    label="Confirm Password"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    autoComplete="bday-day"
                    placeholder="Please enter your password"
                    key={form.key("confirmPassword")}
                    {...form.getInputProps("confirmPassword")}
                  />

                  <Button
                    variant="filled"
                    type="submit"
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    fullWidth
                  >
                    Register
                  </Button>
                  <Button
                    variant="subtle"
                    size="lg"
                    radius="xl"
                    tt="uppercase"
                    onClick={() => router.push("/")}
                    fullWidth
                  >
                    Login
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

export default RegisterUser;
