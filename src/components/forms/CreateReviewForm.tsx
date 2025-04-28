import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Rating, Stack, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { number, object, string } from 'yup';

import type { AddReviewProductRequest } from '$models';
import { useRtkMutation } from '$shared/hooks';
import { Button } from '$shared/ui';
import { useAddProductReviewMutation } from '$store';

const createReviewSchema = object({
    id: string().required(),
    rating: number().required('Обязательное поле'),
    text: string().max(2000, 'Комментарий должен быть не длиннее 2000 символов').required('Обязательное поле'),
});

interface CreateReviewFormProps {
    productId: string;
    onSuccessCreate: VoidFunction;
}

export const CreateReviewForm: FC<CreateReviewFormProps> = ({ productId, onSuccessCreate }) => {
    const [addReview, { isLoading }] = useRtkMutation(useAddProductReviewMutation);

    const { control, handleSubmit, reset } = useForm<AddReviewProductRequest>({
        defaultValues: {
            id: productId,
        },
        resolver: yupResolver(createReviewSchema),
    });

    const onSubmit = (data: AddReviewProductRequest) => {
        addReview(data, {
            onSuccess: () => {
                reset();
                onSuccessCreate();
            },
        });
    };

    return (
        <Grid
            container
            rowGap={4}
            marginTop={4}
            component="form"
            data-testid="CreateReviewForm__form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid item xs={3}>
                <Typography>Общая оценка</Typography>
            </Grid>
            <Grid item xs={9}>
                <Controller
                    control={control}
                    name="rating"
                    render={({ field: { value, onChange }, fieldState }) => (
                        <Stack gap={1}>
                            <Rating
                                value={value}
                                size="large"
                                disabled={isLoading}
                                data-testid="CreateReviewForm_rating__input"
                                onChange={onChange}
                            />
                            {fieldState.invalid && (
                                <Typography color={red[400]}>{fieldState.error?.message}</Typography>
                            )}
                        </Stack>
                    )}
                />
            </Grid>
            <Grid item xs={3}>
                <Typography>Комментарий</Typography>
            </Grid>
            <Grid item xs={9}>
                <Controller
                    control={control}
                    name="text"
                    render={({ field: { value, onChange }, fieldState }) => (
                        <TextField
                            value={value}
                            placeholder="Ваш отзыв..."
                            variant="outlined"
                            rows={2}
                            multiline
                            fullWidth
                            disabled={isLoading}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            inputProps={{
                                'data-testid': 'CreateReviewForm_text__input',
                            }}
                            onChange={onChange}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={3}>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    isLoading={isLoading}
                    data-testid="CreateReviewForm_submit__button"
                >
                    Оставить отзыв
                </Button>
            </Grid>
        </Grid>
    );
};
