import React from "react";
import { Text , Container , Flex ,  HStack, Button, useColorMode } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { PlusSquareIcon } from '@chakra-ui/icons'




const Navbar = ()=>{
    const { colorMode, toggleColorMode} = useColorMode()
    return(
        <Container maxW={"1140px"} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base: "column", sm:"row"}}>
                <Text fontSize={{ base: "22", sm: "28"}} fontWeight={"bold"} textTransform={"uppercase"} alignItems={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
                    <Link to={"/"}>Product store</Link>
                </Text>

                <HStack spacing={2}  alignItems={"center"} >
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20}/>
                        </Button>
                    
                    </Link>

                    <Link>
                         <Button onClick={toggleColorMode}>{colorMode === "light"? "☀️": "🌙"}</Button>
                    </Link>

                </HStack>

            </Flex>

        </Container>


    );
};


export default Navbar