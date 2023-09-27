import lighthouse from "@lighthouse-web3/sdk";
import 'dotenv/config'
import ethers from "ethers";
import fs from "fs";

/// va en el front
const signAuthMessage = async (publicKey, privateKey) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = new ethers.Wallet(privateKey, provider);
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
}

export const save = async (image) => {
    const uploadResponse = await lighthouse.uploadBuffer(image, process.env.LIGHT_HOUSE_API_KEY);
    console.log(uploadResponse);
    return uploadResponse;
}

export const saveEncrypt = async (text) => {

    const apiKey = process.env.LIGHT_HOUSE_API_KEY;
    const publicKey = process.env.WALLET_PUBLIC_KEY
    const privateKey = process.env.WALLET_PRIVATE_KEY
    let signedMessage = await signAuthMessage(publicKey, privateKey);

    const response = await lighthouse.textUploadEncrypted(text, apiKey, publicKey, signedMessage);
    signedMessage = await signAuthMessage(publicKey, privateKey);
    await createControlAcces(response.data.Hash, signedMessage, publicKey)

    // Display response
    console.log(response);

    return response.data.Hash

}

export const saveTextEncrypt = async (text, signedMessage, publicKey) => {

    const apiKey = process.env.LIGHT_HOUSE_API_KEY;


    const response = await lighthouse.textUploadEncrypted(text, apiKey, publicKey, signedMessage);

    // Display response
    console.log(response);


    return response.data.Hash

}

export const createControlAcces = async (cid, signedMessage, publicKey) => {

    console.log(`cid: ${cid}`)
    console.log(`publicKey: ${publicKey}`)
    console.log(`signedMessage: ${signedMessage}`)
    try {

        const conditions = [
            {
                id: 1,
                chain: "Sepolia",
                method: "balanceOf",
                standardContractType: "ERC721",
                contractAddress: "0x558604797D9aEBfb87f9fD4127acdC42713AE18E",
                returnValueTest: { comparator: ">=", value: "1" },
                parameters: [":userAddress"],
            }
        ]

        const aggregator = "([1])";

        const response = await lighthouse.applyAccessCondition(
            publicKey,
            cid,
            signedMessage,
            conditions,
            aggregator
        );

        // Display response
        console.log('condition fine')
        console.log(response);
    } catch (error) {
        console.log('condition error')
        console.log(error)
    }
}

export const getFileEncryptionKey = async (cid) => {
    try {
        // Get key back after passing access control condition
        const publicKey = process.env.WALLET_PUBLIC_KEY
        const privateKey = process.env.WALLET_PRIVATE_KEY

        const signedMessage = await signAuthMessage(publicKey, privateKey);

        const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
            cid,
            publicKey,
            signedMessage
        );
        console.log(fileEncryptionKey);

        // Decrypt File
        const decrypted = await lighthouse.decryptFile(
            cid,
            fileEncryptionKey.data.key
        );

        console.log(decrypted.toString())
        fs.createWriteStream("fileName.json").write(Buffer.from(decrypted));

    } catch (error) {
        console.log(error)
    }
}

export const getFileEncryptionKeyWithSing = async (cid, signedMessage, publicKey) => {
    try {
        const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
            cid,
            publicKey,
            signedMessage
        );

        // Decrypt File
        const decrypted = await lighthouse.decryptFile(
            cid,
            fileEncryptionKey.data.key
        );

        console.log(decrypted.toString())
        fs.createWriteStream("fileName.json").write(Buffer.from(decrypted));

    } catch (error) {
        console.log(error)
    }
}