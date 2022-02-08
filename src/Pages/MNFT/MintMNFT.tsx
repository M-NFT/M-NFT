import { Button, CircularProgress, FilledInput, Grid, Paper, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Icon48PictureOutline } from "@vkontakte/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { Header } from "../../Components/header/Header";
import { Input } from "../../Components/input/Input"
import { Textarea } from "../../Components/input/Textarea"
import { AccountContext } from "../../context/AccountState"
import abi from "./contract.json"
import bs from "./contract_bs.json"
import { useDropzone } from 'react-dropzone'
//@ts-ignore
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

interface MNFTForm {
    image_cid?: string,
    image?: string,
    name?: string,
    description?: string,
    cost?: number,
    costAd?: number
}


const MintMNFT = () => {
    const { account, connect } = useContext(AccountContext);
    const [loadingImage, setLoadingImage] = useState(false);
    const [form, setForm] = useState<MNFTForm>({});
    const [mintResult, setMintResult] = useState({});
    const [tokenId, setTokenId] = useState({});
    const [cid, setCid] = useState({});

    function onChange(e: any) {
        const { name, value } = e.target;
        setForm((prev: MNFTForm) => ({
            ...prev,
            [name]: value
        }));
    }

    function renameFile(originalFile: File, newName: string) {
        return new File([originalFile], newName, {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

    const onDrop = async (acceptedFiles: any) => {
        let files: File[] = [];
        setLoadingImage(true);
        const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM4OTdjNzAxNzkzNzY5NjMzZmI2NkVDQjE4NkE2OTczMjk4RDFjMzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIzOTk1MzY0ODUsIm5hbWUiOiJ0ZXN0In0.3vRkc5ObyMCWz_aJ5L8IHnm7imjCbYu8InziDoKZquM" })
        acceptedFiles.forEach((file: any, i: number) => {
            files.push(renameFile(file, String(i)));
        });
        const cid = await client.put(files)
        setLoadingImage(false);
        setForm((prev: MNFTForm) => ({
            ...prev,
            image: "ipfs://" + cid,
            image_cid: cid
        }));
        setCid(cid);
        console.log('stored files with cid:', cid);
        console.log('stored files with cid:', "ipfs://" + cid + "/0");
    }

    async function CreateMNft(){
        // @ts-ignore
        const { receiptMint, MNFT } = mintResult
        // MNFT.methods.create_M_NFT()

        await account.web3!.eth.sendTransaction({
            to: receiptMint.contractAddress,
            from: account.address!,
            data: MNFT.methods.create_M_NFT(
                tokenId,
                "ipfs://" + cid + "/0",
                form.image,
                1644115473
            ).encodeABI(),
            gas: 3000000,
        })
    }

    async function Mint(){
        // @ts-ignore
        const { receiptMint,MNFT } = mintResult
        const res = await account.web3!.eth.sendTransaction({
            to: receiptMint.contractAddress,
            from: account.address!,
            data: MNFT.methods.mint().encodeABI(),
            gas: 3000000,
        })
          // @ts-ignore
        setTokenId(res.logs[0]);
        console.log("res",res);
    }

    async function mintNFT() {

        console.log(form);
         

        if (!account) return;
        if (!account.web3) return;

        console.log(account)
        //@ts-ignore
        const MNFT = new account.web3.eth.Contract(abi, account.address, {
            from: account.address,
            gas: 3000000,
        });

        MNFT.deploy({
            data: bs.object
        }).send({
            from: account.address!,
            gas: 3000000,
        }, (err: any, hash) => {
            console.log(hash);
        }).on("receipt", async (receiptMint) => {
            setMintResult({receiptMint:receiptMint,MNFT:MNFT})
            const res = await account.web3!.eth.sendTransaction({
                to: receiptMint.contractAddress,
                from: account.address!,
                data: MNFT.methods.mint().encodeABI(),
                gas: 3000000,
            })
            console.log("res",res);

            // await account.web3!.eth.sendTransaction({
            //     to: receiptMint.contractAddress,
            //     from: account.address!,
            //     data: MNFT.methods.create_M_NFT(
            //         1,
            //         form.image,
            //         form.image,
            //         1644115473
            //     ).encodeABI(),
            //     gas: 3000000,
            // })
        }).on("error", (err: any) => {
            console.log(err);
        })


        // const transaction =  MNFT.methods.mint();
        // const txObject = {
        //     to: contract_address,
        //     from: account.address!,
        //     data: transaction.encodeABI(),
        //     gas: 33300000
        // };

        // console.log(txObject);


        // try {
        //     const signed = await account.web3!.eth.sendTransaction(txObject);
        //     console.log(signed);

        //     // const txHash = await account.web3!.eth.sendSignedTransaction(signed);
        //     // return {
        //     //     success: true,
        //     //     status: txHash
        //     // }
        // } catch (error: any) {
        //     console.log(error);
        // }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    if (!account.web3) {
        return <button style={{ marginTop: 90 }} onClick={connect}>connect Metamask</button>
    }

    return (
        <Box>
            <Stack spacing={2} sx={{ height: "100vh" }} direction="row" justifyContent="center" alignItems="center">
                <Paper>
                    {!form.image ? <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#636366"
                        }}
                        width={400}
                        height={400}
                        {...getRootProps()}
                    >
                        {loadingImage ? <CircularProgress /> : <>
                            <input name="images" {...getInputProps()} />
                            {/*<input name="images-1" />*/}
                            <Icon48PictureOutline fill="#636366" width={100} height={100} />
                            {isDragActive ?
                                <Typography>Drag/drope File here</Typography> :
                                <Typography>Drag 'n' drop some files here, or click to select files</Typography>
                            }
                        </>}
                    </Box> :
                        <Box
                            width={400}
                            height={400}
                            sx={{
                                backgroundImage: `url(https://ipfs.io/ipfs/${form.image_cid}/0)`,
                                backgroundColor: "background.paper",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                borderRadius: 8
                            }}
                        >
                        </Box>
                    }
                </Paper>

                <Box width="30%">
                    <Grid container spacing={2} component="form">
                        <Grid item xs={12}>
                            <Input
                                label="Name"
                                name="name"
                                onChange={onChange}
                                value={form.name}
                                placeholder="Name of composition"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Textarea
                                label="Description"
                                name="description"
                                onChange={onChange}
                                value={form.description}
                                placeholder="Description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Price of NFT"
                                name="cost"
                                type="number"
                                onChange={onChange}
                                value={form.cost}
                                placeholder="1.1 ETH"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Price of one week ad"
                                type="number"
                                name="costAd"
                                onChange={onChange}
                                value={form.costAd}
                                placeholder="0.11 ETH"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={mintNFT}>Publish</Button>
                                <Button variant="contained" onClick={mintNFT}>Publish original</Button>
                                <Button>Save draft</Button>
                                <Button onClick={Mint}>Mint</Button>
                                <Button onClick={CreateMNft}>create M-Nft</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
}

export default MintMNFT;