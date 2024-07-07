"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  List,
  LoadingOverlay,
  Stack,
  Table,
} from "@mantine/core";

import { useGetTeams } from "@/hooks/useTeam";
import { useAuthStore } from "@/store/auth";
import { useDocumentTitle } from "@mantine/hooks";
import { useRouter } from "next/navigation";

const Team = () => {
  const { setToken } = useAuthStore();
  const router = useRouter();
  useDocumentTitle("TEAM | Tournamen");

  const { teamsList, isLoading } = useGetTeams();

  const rows = teamsList?.map((team) => (
    <Table.Tr key={team.teamName}>
      <Table.Td>{team.teamName}</Table.Td>
      <Table.Td>
        <List>
          {team.members.map((member) => (
            <List.Item key={member.name}>{member.name}</List.Item>
          ))}
        </List>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Flex h="100vh" miw={"100%"} justify="center" align="center" p={24}>
        <Stack gap={48} justify="center" align="stretch" h={"60%"} w="50%">
          <Flex>
            <Card p={28} withBorder w="100%" radius="lg">
              <Stack justify="center" align="center">
                <Button onClick={() => router.push("/team/register")}>
                  Register Team
                </Button>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/");
                    setToken(null);
                  }}
                >
                  Logout
                </Button>
                <Table striped withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Team Name</Table.Th>
                      <Table.Th>Members</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Team;
