import { styled, Typography, Stack, Avatar } from "@mui/material";

interface CellUserProps {
    name: string,
    image: string,
    title: string
}

const TypographyNickname = styled(Typography)(({ theme }) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary,
}));

export const CellUser = ({ name, image, title = 'master' }: CellUserProps) => {
    return (
        <Stack spacing={1} p={1} sx={{ maxWidth: 180 }}>
            <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                <Avatar src={image} sx={{ height: 36, width: 36 }} />
                <TypographyNickname maxWidth={200}>{name}</TypographyNickname>
            </Stack>
        </Stack>
    );
}