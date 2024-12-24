import { FC, Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { baseDataAPI } from '../../../services/baseDataService';
import { QuickOrderComponent } from '../../../components/Modals';
import { onOrderBuy1click } from '../../../event';
import type { Offers } from '../../../models/product';
import { Section } from '../../../models/filter';

const schema = yup.object().shape({
	telephone: yup.string().min(13).max(13).required('Це поле обовʼязкове.'),
});

interface FormProps {
	telephone: string
}

const defaultValues = {
	telephone: '',
}

interface QuickOrderProps {
	offerId: number
	quantity: number
	brand: string | undefined
	fullName: string | undefined
	section: Section
	model: string | undefined
	offerItem: Offers | undefined
	setModalActive: Dispatch<SetStateAction<boolean>>
}

export const QuickOrder: FC<QuickOrderProps> = (
	{
		offerId,
		quantity,
		brand,
		fullName,
		section,
		model,
		offerItem,
		setModalActive
	}) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [createOrder] = baseDataAPI.useCreateOrderMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})
	
	const onSubmitQuickOrder: SubmitHandler<FormProps> = async ({ telephone }) => {
		setLoading(true);
		const product = {
			product_id: offerItem?.product_id,
			offer_id: offerId,
			price: Number(offerItem?.price),
			quantity,
		};

		await createOrder({
			fast: 1,
			firstname: '',
			lastname: '',
			surname: '',
			email: '',
			telephone,
			total: Number(offerItem?.price) * quantity,
			comment: 'null',
			payment_method: 1,
			shipping_method: 1,
			payment_address_1: 'null',
			payment_address_2: 'null',
			payment_city: '',
			ref_wirehouse: '',
			ref_city: '',
			products: [product],
		}).then((response: { data?: { result: boolean, linkpay: string, order_id: number }; error?: FetchBaseQueryError | SerializedError }) => {
			const data = response?.data;
			if (data) {
				if(data?.linkpay?.length > 0) {
					window.open(data?.linkpay, "_blank")
				}
				if(data?.result) {
					onOrderBuy1click(offerItem, fullName, brand, section, model, quantity, data?.order_id);
					methods.reset();
					setModalActive(false);
					navigate('/order/successful');
				}
			} else if(response.error) {
				console.error('An error occurred:', response.error);
			}
		}).finally(() => {
			setLoading(false);
		});
	}
	
	return <FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(onSubmitQuickOrder)}>
			<QuickOrderComponent loading={ loading } />
		</form>
	</FormProvider>
};
