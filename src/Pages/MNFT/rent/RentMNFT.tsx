import { Box, Grid, Stack, Button } from "@mui/material";
import { useRef, useState, useContext, useEffect } from "react";
import { ImageEditor } from "../../../Components/image-editor/imageEditor";
import { Image } from "../../../Components/image/Image";
import { Input } from "./../../../Components/input/Input";
import { AccountContext } from './../../../context/AccountState';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProcessedRentMnft } from './../../../Modals/ProcessedRentMNFT';
import { Login } from "../../../Components/login/Login";

export interface RentFormMNFT {
    timeStart?: Date,
    timeEnd?: Date,
    costAd?: number,
    stageRef?: any,
    mnft?: any
}

export const RentMNFT = () => {
    const { account } = useContext(AccountContext);
    const nav = useNavigate();
    const { state } = useLocation();
    const [form, setForm] = useState<RentFormMNFT>({});
    const [isProcessed, setIsProcessed] = useState(false);
    const stageRef = useRef<any>();
    const ADVImageRef = useRef<any>();
    const [ADVImageUrl, setADVImageUrl] = useState();

    // const MakeNFT = () => {
    //     if (stageRef.current) {
    //       const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
    //       console.log(dataURL); 
    //     }
    //   };

    useEffect(() => {
        if (!state) {
            nav("/");
        }
    }, [state])

    if (!account) {
        return <Login />
    }

    return (
        <Stack
            height="calc(100% - 64px)"
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
        >
            <Box>
                <ImageEditor
                    size={500}
                    image={`https://ipfs.io/ipfs/${(state as any)?.image?.split("//")[1]}`}
                    ADVImageUrl={ADVImageUrl}
                    stageRef={stageRef}
                />
            </Box>
            <Box width="25% ">
                <Grid container spacing={2} component="form">
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row">
                            <input
                                type="file"
                                id="ADV"
                                ref={ADVImageRef}
                                style={{ display: "none" }}
                                onChange={(event: any) => {
                                    let reader = new FileReader();
                                    reader.onload = (e: any) => {
                                        setADVImageUrl(e.target.result);
                                    };
                                    reader.readAsDataURL(event.target?.files[0]);
                                }}
                            />
                            <Image width={100} height={100} onClick={() => {
                                ADVImageRef.current.click();
                            }} />
                            <Image width={100} height={100} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="Start"
                            name="name"
                            type="datetime-local"
                            focused
                            onChange={(e) => {
                                setForm((prev: RentFormMNFT) => ({
                                    ...prev,
                                    timeStart: new Date(e.target.value)
                                }))
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="End"
                            type="datetime-local"
                            name="description"
                            onChange={(e) => {
                                setForm((prev: RentFormMNFT) => ({
                                    ...prev,
                                    timeEnd: new Date(e.target.value)
                                }))
                            }}
                            focused
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="Price of ad"
                            name="cost"
                            type="number"
                            focused
                            placeholder="1.1 ETH"
                            onChange={(e) => {
                                setForm((prev: RentFormMNFT) => ({
                                    ...prev,
                                    costAd: Number(e.target.value)
                                }))
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button onClick={() => setIsProcessed(true)} variant="contained" >Apply</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <ProcessedRentMnft 
                    onClose={() => setIsProcessed(false)}
                    open={isProcessed}
                    form={{
                        ...form,
                        stageRef,
                        mnft: state
                    }}
                />
            </Box>
        </Stack>
    );
};
