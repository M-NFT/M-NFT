import { Box, Button, Typography, Stack, CircularProgress } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CellUser } from "../../../Components/cell-user/CellUser";
import { Image } from "../../../Components/image/Image";
import { CardHistory } from "./../../../Components/card-history/CardHistory";
import { ModalError } from './../../../Modals/ModalError';
import { useState } from 'react';
import { gql, useQuery } from "@apollo/client";


const GET_MNFT = gql`
    query GetMNFT($address: String) {
  getMNFT(address: $address) {
    address
    blockchain
    image
    cost
    costAd
    owner {
      address
      image
      name
    }
    symbol
    standart
    description
    name
    sponsor {
      image
      name
      address
    }
  }
}
`;

export const MNFT = () => {
  const [isError, setIsError] = useState(false);
  const { address } = useParams();
  const { data: ResponseMNFT, loading, error } = useQuery(GET_MNFT, { variables: { address }});
  const { getMNFT: MNFT } = ResponseMNFT;  
  const nav = useNavigate();

  if(loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          justifyContent: "center",
        }}
      >
        <Image
          width="100%"
          height={400}
          src={`https://ipfs.io/ipfs/${MNFT.image?.split("//")[1]}`}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="div"
            p={2}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Stack direction="row" spacing={1} p={1}>
                <CellUser
                  title="Owner"
                  name={
                    MNFT.owner?.name
                      ? `@${MNFT.owner?.name}`
                      : MNFT.owner?.address
                  }
                  image="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x0271e8197f31a493629baab075295b8e5fa33aad/avatar/QmYmAr3DjoDaozskiFD7g8YJ9sNd8JMmFdACfhFALNCm32"
                />
                {MNFT.sponsor && (
                  <CellUser
                    title="Sponsor"
                    name={
                      MNFT.sponsor?.name
                        ? `@${MNFT.sponsor?.name}`
                        : MNFT.sponsor?.address
                    }
                    image="https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/0x0271e8197f31a493629baab075295b8e5fa33aad/avatar/QmYmAr3DjoDaozskiFD7g8YJ9sNd8JMmFdACfhFALNCm32"
                  />
                )}
              </Stack>
              <Box>
                <Typography p={1} variant="h2" color="text.primary">
                  {MNFT.name}
                </Typography>
                <Typography p={1} variant="body1" color="text.primary">
                  {MNFT.description}
                </Typography>
              </Box>
              <Stack direction="row" p={2} spacing={1}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => nav("/rent/" + MNFT.address)}
                  sx={{
                    backgroundColor: "#414144",
                    color: "text.primary",
                    fontWeight: 700,
                  }}
                >
                  Rent AD
                </Button>
                <Button size="large" color="secondary" onClick={() => setIsError(true)}>
                  Buy for 4.4 ETH
                </Button>
                <Button
                  sx={{ backgroundColor: "#414144" }}
                  size="large"
                  color="secondary"
                  href={`https://rinkeby.rarible.com/token/${address}:0?tab=details`}
                  target="_blank"
                >
                  Open on rarible.com
                </Button>
                <Button
                  sx={{ backgroundColor: "#414144" }}
                  size="large"
                  color="secondary"
                  href={`https://testnets.opensea.io/assets/${address}/0`}
                  target="_blank"
                >
                  Open on opensea.io
                </Button>
              </Stack>
            </div>
            <div>
              <CardHistory />
            </div>
          </Box>
        </div>
      </div>
      <ModalError open={isError} onClose={() => setIsError(false)} />
    </Box>
  );
};
