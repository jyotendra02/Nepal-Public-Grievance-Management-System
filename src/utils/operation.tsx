import { tezos } from "./tezos"

export const addUserOperation = async (ImgHash: String) => {
    try {
        const contract = await tezos.wallet.at("KT1AQynC7vfFjvTRk6XbccwvVmuTUWHJE4Rc");
        const op =  await contract.methods.add_user(ImgHash).send()
        await op.confirmation(1)
        alert("Successfully Image Uploaded");
    } catch (error) {
        throw error
    }
};


