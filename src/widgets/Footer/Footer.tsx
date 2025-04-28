import type { FC } from 'react';
import { AppBar, Container, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { LogoIcon } from '$shared/ui';

export const Footer: FC = () => {
    return (
        <AppBar component="footer" position="static" sx={{ height: '194px', paddingTop: 2 }}>
            <Container sx={{ height: '100%', paddingBottom: 5 }}>
                <Grid container justifyContent="space-between" height="100%">
                    <Grid item container direction="column" justifyContent="space-between" xs="auto">
                        <Grid item>
                            <LogoIcon color="white" />
                        </Grid>
                        <Grid item>
                            <Typography color={grey[200]}>© «Интернет-магазин DogFood.ru»</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" justifyContent="space-between" xs="auto">
                        <Grid item>
                            <Typography color={grey[200]} fontSize="18px" lineHeight="24px" fontWeight="bold">
                                Мы на связи
                            </Typography>
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item>
                                <Typography color={grey[200]} fontSize="18px" lineHeight="24px" fontWeight="bold">
                                    8 (999) 00-00-00
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={grey[200]}>dogfood.ru@gmail.com</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography color={grey[200]}>Социальные сети</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
};
