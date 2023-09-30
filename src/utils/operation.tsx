import { tezos } from "./tezos"

export const addOperation = async (DataHash: String) => {
    try {
        const contract = await tezos.wallet.at("KT1UTRXBSt1NePtBG5LobtBvhRaSdeaszxUB");
        const op =  await contract.methods.add(DataHash).send()
        await op.confirmation(1)
        alert("Complaint Registered Successfully");
    } catch (error) {
        throw error
    }
    
};


