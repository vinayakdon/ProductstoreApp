import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Image, Text, useColorModeValue, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter,ModalBody, Button, VStack, Input,  useDisclosure } from "@chakra-ui/react"
import { useProductStore } from '../store/product.js'
import { IconButton } from '@chakra-ui/react'

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const {deleteProduct, updateProduct} = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const handleDeleteProduct = async(prodId)=>{
        console.log("productId:-->", prodId)
        const {success, message} = await deleteProduct(prodId)
        console.log("success->", success, "message to-->", message)

        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,

            })

        }
        else{
            toast({
                title: "success",
                description: "Product deleted succesfully",
                duration: 3000,
                isClosable: true,
                status: "success"
            })
        }

    }

    const handleUpdateProduct = async(prodId, updatedProduct)=>{
        const {success, message} = await updateProduct(prodId, updatedProduct)
        onClose()

        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,

            })

        }
        else{
            toast({
                title: "success",
                description: "Product updated succesfully",
                duration: 3000,
                isClosable: true,
                status: "success"
            })
        }

    }

  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" transition="all 0.3s" _hover={{ transform:"translateY(-5px)", shadow:"xl"}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} colorScheme='blue' onClick={onOpen} />
                <IconButton icon={<DeleteIcon/>} onClick={()=> handleDeleteProduct(product._id)} colorScheme='red'/>
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name' name='name' px={5} value={updatedProduct.name} onChange={
                            (e)=>{ setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        } />
                        <Input placeholder='Price' type='number' name='price' px={5} value={updatedProduct.price} onChange={
                            (e)=>{ setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        } />
                        <Input placeholder='Image URL' name='image' px={5} value={updatedProduct.image} onChange={
                            (e)=>{ setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        } />

                    </VStack>
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='red' mr={3}  onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>
                   Update
                </Button>
                <  Button variant='ghost'onClick={onClose}>Cancel</Button>
                </ModalFooter>
           </ModalContent>

        </Modal>

    </Box>
  )
}

export default ProductCard
