"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Stack,
  TextInput,
  em,
  Select,
} from "@mantine/core";
import { useForm, isNotEmpty, matches } from "@mantine/form";
import { useAuthStore } from "@/store/auth";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { toast } from "sonner";
import { useRegisterTeam } from "@/hooks/useTeam";
import { RegisterTeamPayload } from "@/services/team";

interface Member {
  name: string;
  phone: string;
  gender: string;
}

interface FormValues {
  teamName: string;
  members: Member[];
}

const RegisterTeam = () => {
  const { token } = useAuthStore();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const router = useRouter();
  useDocumentTitle("Register Team | Tournament");
  const { registerTeam } = useRegisterTeam();

  const form = useForm<FormValues>({
    initialValues: {
      teamName: "",
      members: [
        { name: "", phone: "", gender: "" },
        { name: "", phone: "", gender: "" },
      ],
    },

    validate: {
      teamName: (value) => (!value.length ? "Team name cannot be empty" : null),
      members: {
        name: (value) => (!value.length ? "Name cannot be empty" : null),
        phone: (value) => {
          if (!value.length) {
            return "Phone cannot be empty";
          } else if (!/^[0-9]{7,14}$/i.test(value)) {
            return "Phone must be a valid number with 7 to 14 digits";
          }
          return null;
        },
        gender: (value) =>
          !["Man", "Woman"].includes(value)
            ? "Gender must be 'Man' or 'Woman'"
            : null,
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await registerTeam(values as RegisterTeamPayload);
      toast.success("Team registered successfully");
      console.log(response);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  useLayoutEffect(() => {
    if (!token) {
      router.push("/");
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
                    label="Team Name"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    autoComplete="bday-day"
                    placeholder="Please enter your team name"
                    error={form.errors.teamName}
                    {...form.getInputProps("teamName")}
                  />
                  {form.values.members.map((_, index) => (
                    <Box key={index} w="100%">
                      <h3>Member {index + 1}</h3>
                      <TextInput
                        label="Name"
                        withAsterisk
                        radius="xl"
                        variant="filled"
                        w="100%"
                        size="xl"
                        autoComplete="bday-day"
                        placeholder="Please enter member's name"
                        error={form.errors.members}
                        {...form.getInputProps(`members.${index}.name`)}
                      />
                      <TextInput
                        label="Phone"
                        withAsterisk
                        radius="xl"
                        variant="filled"
                        w="100%"
                        size="xl"
                        autoComplete="bday-day"
                        placeholder="Please enter member's phone number"
                        error={form.errors.members}
                        {...form.getInputProps(`members.${index}.phone`)}
                      />
                      <Select
                        label="Gender"
                        withAsterisk
                        radius="xl"
                        variant="filled"
                        w="100%"
                        size="xl"
                        placeholder="Select member's gender"
                        data={[
                          { value: "Man", label: "Man" },
                          { value: "Woman", label: "Woman" },
                        ]}
                        error={form.errors.members}
                        {...form.getInputProps(`members.${index}.gender`)}
                      />
                    </Box>
                  ))}
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
                    onClick={() => router.push("/team")}
                    fullWidth
                  >
                    Back
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

export default RegisterTeam;
