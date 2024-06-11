import React, { useState, useEffect } from "react";
import { Container, Box, VStack, HStack, Text, Input, Button, Avatar, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", avatar: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcxODEwNzg4MHww&ixlib=rb-4.0.3&q=80&w=1080" },
    { id: 2, name: "Bob", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTgxMDc4ODB8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  ]);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Message cannot be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: currentUser,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleUserChange = (user) => {
    setCurrentUser(user);
  };

  return (
    <Container maxW="container.lg" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack spacing={4} width="100%" justifyContent="space-between">
          <HStack spacing={2}>
            {users.map((user) => (
              <Avatar key={user.id} name={user.name} src={user.avatar} onClick={() => handleUserChange(user)} cursor="pointer" />
            ))}
          </HStack>
          <IconButton aria-label="User Profile" icon={<FaUserCircle />} size="lg" />
        </HStack>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" height="70vh" p={4} bg="gray.50">
          <VStack spacing={4} align="stretch" height="100%" overflowY="auto">
            {messages.map((message) => (
              <Box key={message.id} alignSelf={message.sender.id === currentUser.id ? "flex-end" : "flex-start"} bg={message.sender.id === currentUser.id ? "blue.100" : "green.100"} borderRadius="md" p={2} maxWidth="80%">
                <Text fontSize="sm" color="gray.500">
                  {message.sender.name} - {message.timestamp}
                </Text>
                <Text>{message.text}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <HStack spacing={2} width="100%">
          <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button colorScheme="blue" onClick={handleSendMessage} rightIcon={<FaPaperPlane />}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
