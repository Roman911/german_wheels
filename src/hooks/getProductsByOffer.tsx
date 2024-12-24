import { useEffect, useState } from 'react';
import { baseDataAPI } from '../services/baseDataService';
import { Section } from '../models/filter';
import { Product } from '../models/products';

interface ProductItem {
	id: number;
	section: Section;
	quantity?: number;
}

export const useAppGetProductsByOffer = (products: ProductItem[] = []) => {
	const [groupedIds, setGroupedIds] = useState<{ tires: number[]; disks: number[]; battery: number[]; autoGoods: number[]; services: number[] }>({
		tires: [],
		disks: [],
		battery: [],
		autoGoods: [],
		services: [],
	});

	const [groupedItems, setGroupedItems] = useState<{ tiresItems: Product[]; disksItems: Product[]; batteryItems: Product[]; autoGoodsItems: Product[]; servicesItems: Product[] }>({
		tiresItems: [],
		disksItems: [],
		batteryItems: [],
		autoGoodsItems: [],
		servicesItems: [],
	});

	const [newProducts, setNewProducts] = useState<Product[]>([]);

	const { data: dataTires } = baseDataAPI.useFetchProductsQuery({
		id: `?Offer_id=${groupedIds.tires.join(',')}`,
		length: groupedIds.tires.length || 1,
	});
	const { data: dataDisks } = baseDataAPI.useFetchProductsQuery({
		id: `?typeproduct=3&Offer_id=${groupedIds.disks.join(',')}`,
		length: groupedIds.disks.length || 1,
	});
	const { data: dataBattery } = baseDataAPI.useFetchProductsQuery({
		id: `?typeproduct=4&Offer_id=${groupedIds.battery.join(',')}`,
		length: groupedIds.battery.length || 1,
	});
	const { data: dataAutoGoods } = baseDataAPI.useFetchProductsQuery({
		id: `?typeproduct=5&categories=7&Offer_id=${groupedIds.battery.join(',')}`,
		length: groupedIds.autoGoods.length || 1,
	});
	const { data: dataServices, isLoading } = baseDataAPI.useFetchProductsQuery({
		id: `?typeproduct=5&categories=8&Offer_id=${groupedIds.battery.join(',')}`,
		length: groupedIds.services.length || 1,
	});

	// Group products by their section and update grouped IDs state
	useEffect(() => {
		const grouped = products.reduce(
			(acc, product) => {
				switch (product.section) {
					case Section.Tires:
						acc.tires.push(product.id);
						break;
					case Section.Disks:
						acc.disks.push(product.id);
						break;
					case Section.Battery:
						acc.battery.push(product.id);
						break;
					case Section.AutoGoods:
						acc.autoGoods.push(product.id);
						break;
					case Section.Services:
						acc.services.push(product.id);
						break;
					default:
						break;
				}
				return acc;
			},
			{ tires: [], disks: [], battery: [], autoGoods: [], services: [] } as { tires: number[]; disks: number[]; battery: number[]; autoGoods: number[]; services: number[] }
		);
		setGroupedIds(grouped);
	}, [products]);

	// Update grouped items based on data fetched from API
	useEffect(() => {
		setGroupedItems({
			tiresItems: dataTires?.data?.products || [],
			disksItems: dataDisks?.data?.products || [],
			batteryItems: dataBattery?.data?.products || [],
			autoGoodsItems: dataAutoGoods?.data?.products || [],
			servicesItems: dataServices?.data?.products || [],
		});
	}, [dataTires, dataDisks, dataBattery, dataAutoGoods, dataServices]);

	// Sort and update new products based on the original products array
	useEffect(() => {
		const allProducts = [...groupedItems.tiresItems, ...groupedItems.disksItems, ...groupedItems.batteryItems, ...groupedItems.autoGoodsItems, ...groupedItems.servicesItems];
		const sortedProducts = products
			.map((product) => allProducts.find((item) => item.product_id === product.id))
			.filter((item): item is Product => !!item); // Type narrowing to ensure no undefined values

		setNewProducts(sortedProducts);
	}, [groupedItems, products]);

	return {
		products: newProducts,
		tires: groupedIds.tires.length > 0 ? groupedItems.tiresItems : [],
		disks: groupedIds.disks.length > 0 ? groupedItems.disksItems : [],
		battery: groupedIds.battery.length > 0 ? groupedItems.batteryItems : [],
		autoGoods: groupedIds.autoGoods.length > 0 ? groupedItems.autoGoodsItems : [],
		services: groupedIds.services.length > 0 ? groupedItems.servicesItems : [],
		isLoading,
	};
};
